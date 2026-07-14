import { Component, inject, signal } from '@angular/core';
import { RobotService } from '../../services/robot.service';
import { ScanResult } from '../../models/robot.interface';
import { environment } from '../../../../../environments/environment.development';
import { interval, Subscription, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-robot-dashboard',
  imports: [DatePipe],
  templateUrl: './robot-dashboard.component.html',
  styleUrl: './robot-dashboard.component.css',
})
export class RobotDashboardComponent {
  private robotService = inject(RobotService);
  
  // Signals للتحكم في واجهة المستخدم
  isRobotRunning = signal<boolean>(false);
  latestScan = signal<ScanResult | null>(null);
  scanMessage = signal<string | null>(null); // عشان رسالة "No valid plant"
  
  // لحفظ مسار الصورة الأساسي
  readonly imgBaseUrl = `${environment.apiUrl}/Images/`; 
  
  // عشان نوقف الـ Polling لما ندوس Stop أو نخرج من الصفحة
  private pollingSubscription?: Subscription;

  startRobot() {
    this.robotService.startScan().subscribe({
      next: () => {
        this.isRobotRunning.set(true);
        this.startPolling(); // تشغيل العداد
      },
      error: (err) => console.error('Error starting robot', err)
    });
  }

  stopRobot() {
    this.robotService.stopScan().subscribe({
      next: () => {
        this.isRobotRunning.set(false);
        this.stopPolling(); // إيقاف العداد
      },
      error: (err) => console.error('Error stopping robot', err)
    });
  }

  private startPolling() {
    // كل 3000 ملي ثانية (3 ثواني) هننده على الـ API
    this.pollingSubscription = interval(3000)
      .pipe(
        // switchMap بتلغي الطلب القديم لو اتأخر وتبدأ الجديد
        switchMap(() => this.robotService.getLatestScan())
      )
      .subscribe({
        next: (res) => this.handleScanResponse(res),
        error: (err) => console.error('Polling error', err)
      });
  }

  private stopPolling() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  private handleScanResponse(response: any) {
    if (response && response.results && response.results.length > 0) {
      const data = response.results[0];
      
      // بنشيك لو الـ API رجع رسالة ولا رجع داتا الزرعة
      if (data.message) {
        this.scanMessage.set(data.message);
        this.latestScan.set(null);
      } else {
        this.latestScan.set(data);
        this.scanMessage.set(null);
      }
    }
  }

  // أمان: لو المستخدم خرج من الصفحة والروبوت شغال، بنقفل الـ Subscription
  ngOnDestroy() {
    this.stopPolling();
  }
}

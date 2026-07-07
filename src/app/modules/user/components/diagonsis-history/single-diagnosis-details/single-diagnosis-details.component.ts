import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, input, PLATFORM_ID, signal } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DiseaseScanResult } from '../../../models/disease-scan-result.interface';

@Component({
  selector: 'app-single-diagnosis-details',
  imports: [],
  templateUrl: './single-diagnosis-details.component.html',
  styleUrl: './single-diagnosis-details.component.css',
})
export class SingleDiagnosisDetailsComponent {
  data = input.required<DiseaseScanResult>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private userName = signal<string>('');
  private userEmail = signal<string>('');

  private async getBase64FromUrl(url: string): Promise<string | null> {
    if (!url) return null;
    try {

      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.warn(`Could not load image from URL: ${url}`, e);
      return null;
    }
  }

  async exportToPDF() {
    if (isPlatformBrowser(this.platformId)) {
      const rawName = localStorage.getItem('userFirstNameZaraa') || 'Zaraa Grower';
      const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();

      this.userName.set(formattedName);
      this.userEmail.set(localStorage.getItem('userEmailZaraa') || '');
    }
    const doc = new jsPDF('p', 'pt', 'a4');
    const W = doc.internal.pageSize.width;
    const H = doc.internal.pageSize.height;

    const d = this.data();

    const C = {
      emerald600: [5, 150, 105] as [number, number, number],
      emerald500: [16, 185, 129] as [number, number, number],
      emerald200: [167, 243, 208] as [number, number, number],
      emerald100: [209, 250, 229] as [number, number, number],
      emerald50: [236, 253, 245] as [number, number, number],
      slate900: [15, 23, 42] as [number, number, number],
      slate700: [51, 65, 85] as [number, number, number],
      slate500: [100, 116, 139] as [number, number, number],
      slate400: [148, 163, 184] as [number, number, number],
      slate300: [203, 213, 225] as [number, number, number],
      slate200: [226, 232, 240] as [number, number, number],
      slate100: [241, 245, 249] as [number, number, number],
      slate50: [248, 250, 252] as [number, number, number],
      white: [255, 255, 255] as [number, number, number],
      amber600: [217, 119, 6] as [number, number, number],
      amber500: [245, 158, 11] as [number, number, number],
      amber200: [253, 230, 138] as [number, number, number],
      amber50: [255, 251, 235] as [number, number, number],
    };

    const setColor = (type: 'fill' | 'text', color: [number, number, number]) => {
      if (type === 'fill') doc.setFillColor(color[0], color[1], color[2]);
      if (type === 'text') doc.setTextColor(color[0], color[1], color[2]);
    };

    const logoBase64 = await this.getBase64FromUrl('./logos/zaraa.png');

    // ==========================================
    // HEADER
    // ==========================================
    doc.setFillColor(...C.white);
    doc.rect(0, 0, W, 120, 'F');
    doc.setFillColor(...C.emerald500);
    doc.rect(0, 0, W, 4, 'F');

    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', W - 180, 25, 150, 55);
    } else {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(...C.emerald600);
      doc.text('ZARAA SYSTEM', W - 50, 48, { align: 'right' });
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...C.slate900);
    doc.text('Plant Health Diagnosis Report', 40, 45);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...C.emerald600);
    doc.text('Automated AI Crop Disease Detection Report', 40, 60);

    doc.setFontSize(8);
    doc.setTextColor(...C.slate500);
    doc.text(`Date Generated: ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}`, 40, 76);

    doc.setFont('helvetica', 'bold');
    doc.text(`Grower Name: `, 40, 90);
    doc.setFont('helvetica', 'normal');
    doc.text(`${this.userName()} (${this.userEmail()})`, 105, 90);

    doc.setDrawColor(...C.emerald200);
    doc.setLineWidth(1);
    doc.line(40, 105, W - 40, 105);

    // ==========================================
    // 5. TABLE
    // ==========================================


    // 2. Plant image
    const imgBase64 = await this.getBase64FromUrl(d.imageUrl);
    if (imgBase64) {
      doc.addImage(imgBase64, 'JPEG', 40, 70, 150, 150);
    }

    // 3. Plant name & scan date
    const infoY = imgBase64 ? 240 : 80;
    setColor('fill', C.emerald50);
    doc.roundedRect(40, infoY, W - 80, 60, 10, 10, 'F');
    setColor('text', C.slate900);
    doc.setFontSize(16);
    doc.text(`Plant: ${d.plantName}`, 60, infoY + 30);
    doc.setFontSize(10);
    doc.text(`Date: ${new Date(d.scanDate).toLocaleDateString()}`, 60, infoY + 45);

    // 4. Disease name
    const statusY = infoY + 80;
    setColor('fill', C.amber50);
    doc.roundedRect(40, statusY, W - 80, 50, 10, 10, 'F');
    setColor('text', C.amber600);
    doc.setFontSize(14);
    doc.text(`Status: ${d.diseaseName}`, 60, statusY + 32);

    // 5. Content
    const drawContentBox = (y: number, title: string, content: string, bg: [number, number, number], titleColor: [number, number, number]) => {
      setColor('fill', bg);
      doc.roundedRect(40, y, W - 80, 100, 10, 10, 'F');
      setColor('text', titleColor);
      doc.setFont('helvetica', 'bold');
      doc.text(title, 60, y + 25);

      setColor('text', C.slate500);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(content, W - 120);
      doc.text(lines, 60, y + 45);
    };

    drawContentBox(statusY + 70, 'Analysis Description', d.description, C.emerald50, C.emerald600);
    drawContentBox(statusY + 190, 'Symptoms', d.symptoms, C.amber50, C.amber600);
    drawContentBox(statusY + 310, 'Recommended Treatment', d.treatment, C.emerald50, C.emerald600);


    autoTable(doc, {


      // ==========================================
      // 5. FOOTER
      // ==========================================
      didDrawPage: (data) => {
        doc.setFillColor(...C.slate50);
        doc.rect(0, H - 42, W, 42, 'F');
        doc.setDrawColor(...C.emerald200);
        doc.setLineWidth(1);
        doc.line(0, H - 42, W, H - 42);

        if (logoBase64) {
          doc.addImage(logoBase64, 'PNG', 40, H - 33, 65, 23);
        }

        const totalPages = (doc as any).internal.getNumberOfPages();
        doc.setFillColor(...C.emerald100);
        doc.roundedRect(W - 90, H - 33, 52, 18, 5, 5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(...C.emerald600);
        doc.text(`${data.pageNumber} / ${totalPages}`, W - 64, H - 21, { align: 'center' });
      },
    });

    doc.save(`Report_${d.plantName}_${d.id}.pdf`);
  }
}

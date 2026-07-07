import { Component, Inject, input, PLATFORM_ID, signal } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { environment } from '../../../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { DiseaseScanResult } from '../../../models/disease-scan-result.interface';


@Component({
  selector: 'app-print-diagnosis-details-btn',
  imports: [],
  templateUrl: './print-diagnosis-btn.component.html',
  styleUrl: './print-diagnosis-btn.component.css',
})
export class PrintDiagnosisBtnComponent {
  diagnosisList = input.required<DiseaseScanResult[]>();

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

  private formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString;

      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();

      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');

      return `${day}/${month}/${year}  ${hours}:${minutes}`;
    } catch {
      return dateString;
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
    const diagnoses = this.diagnosisList();

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

    const logoBase64 = await this.getBase64FromUrl('./logos/zaraa.png');
    const leafImagesBase64 = await Promise.all(
      diagnoses.map(item => {

        if (!item.imageUrl) return Promise.resolve(null);

        const fullImageUrl = `${environment.apiUrl}/ScanImage/${item.imageUrl}`;

        return this.getBase64FromUrl(fullImageUrl);
      })
    );

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
    doc.text('Plant Health Diagnosis', 40, 45);

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
    // STATS CARDS 
    // ==========================================
    const totalScans = diagnoses.length;
    const healthyCount = diagnoses.filter(d => !d.diseaseName || d.diseaseName.toLowerCase() === 'none' || d.diseaseName === 'سليم').length;
    const infectedCount = totalScans - healthyCount;

    const cards = [
      { label: 'Total Analyzed', value: totalScans, accent: C.slate700, bg: C.slate50, border: C.slate200, bar: C.slate400 },
      { label: 'Healthy Crops', value: healthyCount, accent: C.emerald600, bg: C.emerald50, border: C.emerald200, bar: C.emerald500 },
      { label: 'Infections Found', value: infectedCount, accent: C.amber500, bg: C.amber50, border: C.amber200, bar: C.amber500 },
    ];

    const cardW = 160, cardH = 52, cardGap = 17.5;
    const cardsY = 122;

    cards.forEach((card, i) => {
      const x = 40 + i * (cardW + cardGap);
      doc.setFillColor(...card.bg);
      doc.roundedRect(x, cardsY, cardW, cardH, 6, 6, 'F');
      doc.setDrawColor(...card.border);
      doc.setLineWidth(0.8);
      doc.roundedRect(x, cardsY, cardW, cardH, 6, 6, 'S');
      doc.setFillColor(...card.bar);
      doc.roundedRect(x, cardsY, 3.5, cardH, 2, 2, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(...card.accent);
      doc.text(String(card.value), x + 14, cardsY + 28);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...C.slate500);
      doc.text(card.label, x + 14, cardsY + 42);
    });

    // ==========================================
    // TABLE
    // ==========================================
    const tableTitleY = cardsY + cardH + 22;
    doc.setFillColor(...C.emerald500);
    doc.roundedRect(40, tableTitleY, 3.5, 14, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...C.slate900);
    doc.text('Diagnosis Records & Analytics', 50, tableTitleY + 11);

    const head = [['#', 'Crop / Plant Name', 'AI Detected Disease', 'Confidence', 'Scan Date', 'Image']];

    const data = diagnoses.map((item, idx) => {

      let confidenceStr = String(item.confidenceRate).replace(/%/g, '');
      let finalConfidence = isNaN(Number(confidenceStr)) ? confidenceStr : `${Number(confidenceStr).toFixed(2)}%`;

      return [
        idx + 1,
        item.plantName,
        (!item.diseaseName || item.diseaseName.toLowerCase() === 'none') ? 'Healthy (No Disease)' : item.diseaseName,
        finalConfidence,
        this.formatDate(item.scanDate),
        ''
      ];
    });

    autoTable(doc, {
      head,
      body: data,
      startY: tableTitleY + 25,
      theme: 'plain',
      margin: { left: 40, right: 40, bottom: 50 },
      columnStyles: {
        0: { halign: 'center', cellWidth: 30 },
        1: { fontStyle: 'bold', cellWidth: 100 },
        2: { cellWidth: 140 },
        3: { halign: 'center', cellWidth: 70 },
        4: { halign: 'center', cellWidth: 115 },
        5: { halign: 'center', cellWidth: 60 }
      },

      headStyles: {
        fillColor: C.slate100,
        textColor: C.slate700,
        fontStyle: 'bold',
        fontSize: 8.5,
        cellPadding: { top: 10, bottom: 10, left: 8, right: 8 },
        lineColor: C.slate200,
        lineWidth: 0.5,
        valign: 'middle'
      },

      bodyStyles: {
        textColor: C.slate700,
        fontSize: 8.5,
        cellPadding: { top: 12, bottom: 12, left: 8, right: 8 },
        valign: 'middle',
        lineColor: C.slate100,
        lineWidth: 0.5
      },

      alternateRowStyles: {
        fillColor: C.slate50
      },

      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 3) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.textColor = C.emerald600;
        }
      },

      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 0) {
          const cx = data.cell.x + data.cell.width / 2;
          const cy = data.cell.y + data.cell.height / 2;
          doc.setFillColor(...C.slate100);
          doc.roundedRect(cx - 10, cy - 8, 20, 16, 4, 4, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(...C.slate500);
          doc.text(String(data.row.index + 1), cx, cy + 2.5, { align: 'center' });
        }

        if (data.section === 'body' && data.column.index === 5) {
          const imgBase64 = leafImagesBase64[data.row.index];
          if (imgBase64) {
            const imgSize = 22;
            const x = data.cell.x + (data.cell.width - imgSize) / 2;
            const y = data.cell.y + (data.cell.height - imgSize) / 2;

            doc.setDrawColor(...C.slate200);
            doc.setLineWidth(0.5);
            doc.roundedRect(x - 1, y - 1, imgSize + 2, imgSize + 2, 3, 3, 'S');
            doc.addImage(imgBase64, 'JPEG', x, y, imgSize, imgSize);
          } else {
            doc.setFontSize(7);
            doc.setTextColor(...C.slate400);
            doc.text('No Img', data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2 + 2, { align: 'center' });
          }
        }
      },

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

    doc.save(`Zaraa_Diagnosis_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}

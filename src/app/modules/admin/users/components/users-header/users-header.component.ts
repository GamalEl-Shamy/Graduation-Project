import { Component, input } from '@angular/core';
import { UserItem } from '../../models/user.interface';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-users-header',
  imports: [],
  templateUrl: './users-header.component.html',
  styleUrl: './users-header.component.css',
})
export class UsersHeaderComponent {
  usersList = input.required<UserItem[]>();

  async exportToPDF() {
    const doc = new jsPDF('p', 'pt', 'a4');
    const W = doc.internal.pageSize.width;
    const H = doc.internal.pageSize.height;
    const users = this.usersList();

    const C = {
      emerald600: [5, 150, 105] as [number, number, number],
      emerald500: [16, 185, 129] as [number, number, number],
      emerald400: [52, 211, 153] as [number, number, number],
      emerald200: [167, 243, 208] as [number, number, number],
      emerald100: [209, 250, 229] as [number, number, number],
      emerald50: [236, 253, 245] as [number, number, number],
      slate900: [15, 23, 42] as [number, number, number],
      slate700: [51, 65, 85] as [number, number, number],
      slate500: [100, 116, 139] as [number, number, number],
      slate300: [203, 213, 225] as [number, number, number],
      slate200: [226, 232, 240] as [number, number, number],
      slate100: [241, 245, 249] as [number, number, number],
      slate50: [248, 250, 252] as [number, number, number],
      white: [255, 255, 255] as [number, number, number],
      red500: [239, 68, 68] as [number, number, number],
      red100: [254, 226, 226] as [number, number, number],
      red50: [254, 242, 242] as [number, number, number],
      amber500: [245, 158, 11] as [number, number, number],
      amber100: [254, 243, 199] as [number, number, number],
      amber50: [255, 251, 235] as [number, number, number],
      violet600: [124, 58, 237] as [number, number, number],
      violet100: [237, 233, 254] as [number, number, number],
      violet50: [245, 243, 255] as [number, number, number],
      blue600: [37, 99, 235] as [number, number, number],
      blue100: [219, 234, 254] as [number, number, number],
      blue50: [239, 246, 255] as [number, number, number],
      sky500: [14, 165, 233] as [number, number, number],
      sky100: [224, 242, 254] as [number, number, number],
      sky50: [240, 249, 255] as [number, number, number],
    };

    // ==========================================
    // 0. upload logo
    // ==========================================
    let logoBase64: string | null = null;
    try {
      const logoUrl = './logos/zaraa.png';
      const response = await fetch(logoUrl);
      const blob = await response.blob();
      logoBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.warn('Logo could not be loaded', e);
    }

    // ==========================================
    // 1. LIGHT HERO HEADER
    // ==========================================
    doc.setFillColor(...C.white);
    doc.rect(0, 0, W, 105, 'F');

    // Top emerald accent bar
    doc.setFillColor(...C.emerald500);
    doc.rect(0, 0, W, 4, 'F');

    // Logo
    if (logoBase64) {
      // logo position
      doc.addImage(logoBase64, 'PNG', W - 175, 22, 110, 40);
    } else {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(...C.emerald600);
      doc.text('ZARAA', W - 110, 52, { align: 'center' });
    }

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...C.slate900);
    doc.text('Users Report', 40, 45);

    // Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...C.emerald600);
    doc.text('Enterprise User Management System', 40, 62);

    // Date
    doc.setFontSize(8);
    doc.setTextColor(...C.slate500);
    doc.text(
      `Generated: ${new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      40,
      78,
    );

    // Bottom separator
    doc.setDrawColor(...C.emerald200);
    doc.setLineWidth(1);
    doc.line(40, 95, W - 40, 95);

    // ==========================================
    // 2. STATS CARDS
    // ==========================================
    const total = users.length;
    // const active = ;
    // const blocked = ;
    // const pending = ;

    // const cards = [
    //   {
    //     label: 'Total Users',
    //     value: total,
    //     accent: C.slate500,
    //     bg: C.slate50,
    //     border: C.slate200,
    //     bar: C.slate300,
    //   },
    //   {
    //     label: 'Active',
    //     value: active,
    //     accent: C.emerald600,
    //     bg: C.emerald50,
    //     border: C.emerald200,
    //     bar: C.emerald500,
    //   },
    //   {
    //     label: 'Blocked',
    //     value: blocked,
    //     accent: C.red500,
    //     bg: C.red50,
    //     border: C.red100,
    //     bar: C.red500,
    //   },
    //   {
    //     label: 'Pending',
    //     value: pending,
    //     accent: C.amber500,
    //     bg: C.amber50,
    //     border: C.amber100,
    //     bar: C.amber500,
    //   },
    // ];

    const cardW = 118,
      cardH = 56,
      cardGap = 12;
    const cardsY = 112;

    // cards.forEach((card, i) => {
    //   const x = 40 + i * (cardW + cardGap);

    //   doc.setFillColor(...card.bg);
    //   doc.roundedRect(x, cardsY, cardW, cardH, 7, 7, 'F');

    //   doc.setDrawColor(...card.border);
    //   doc.setLineWidth(0.8);
    //   doc.roundedRect(x, cardsY, cardW, cardH, 7, 7, 'S');

    //   // Left accent bar
    //   doc.setFillColor(...card.bar);
    //   doc.roundedRect(x, cardsY, 3.5, cardH, 2, 2, 'F');

    //   // Value
    //   doc.setFont('helvetica', 'bold');
    //   doc.setFontSize(24);
    //   doc.setTextColor(...card.accent);
    //   doc.text(String(card.value), x + 16, cardsY + 30);

    //   // Label
    //   doc.setFont('helvetica', 'normal');
    //   doc.setFontSize(7.5);
    //   doc.setTextColor(...C.slate500);
    //   doc.text(card.label, x + 16, cardsY + 44);
    // });

    // ==========================================
    // 3. TITLE SECTION 
    // ==========================================
    const tableStartY = cardsY + cardH + 22;

    doc.setFillColor(...C.emerald500);
    doc.roundedRect(40, tableStartY, 3.5, 15, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...C.slate900);
    doc.text('All Users', 50, tableStartY + 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...C.slate500);
    doc.text(`${total} records found`, W - 40, tableStartY + 11, { align: 'right' });

    doc.setDrawColor(...C.slate200);
    doc.setLineWidth(0.5);
    doc.line(40, tableStartY + 19, W - 40, tableStartY + 19);

    // ==========================================
    // 4. TABLE
    // ==========================================
    const head = [['#', 'Full Name', 'Email Address', 'Role', 'Status']];
    const data = users.map((user, idx) => [
      idx + 1,
      `${user.firstName} ${user.lastName}`,
      user.email,
      user.role,
      'Active',
    ]);

    autoTable(doc, {
      head,
      body: data,
      startY: tableStartY + 25,
      theme: 'plain',
      margin: { top: 20, right: 40, bottom: 65, left: 40 },

      headStyles: {
        fillColor: C.slate100,
        textColor: C.slate700,
        fontStyle: 'bold',
        fontSize: 8,
        cellPadding: { top: 9, bottom: 9, left: 10, right: 10 },
        valign: 'middle',
        lineColor: C.slate200,
        lineWidth: 0.5,
      },

      bodyStyles: {
        textColor: C.slate700,
        fontSize: 8.5,
        cellPadding: { top: 9, bottom: 9, left: 10, right: 10 },
        valign: 'middle',
        lineColor: C.slate100,
        lineWidth: 0.5,
      },

      alternateRowStyles: {
        fillColor: C.slate50,
      },

      columnStyles: {
        0: { halign: 'center', cellWidth: 30 }, // ID 
        1: { }, // Full Name (dynamic)
        2: { }, // Email Address (dynamic)
        3: { cellWidth: 85, halign: 'center' }, // Role
        4: { cellWidth: 75, halign: 'center' }, // Status
      },
      tableWidth: 'auto',

      didParseCell: (data) => {
        // Role 
        if (data.section === 'body' && data.column.index === 3) {
          const role = String(data.cell.raw);
          if (role === 'SuperAdmin') {
            data.cell.styles.textColor = C.violet600;
            data.cell.styles.fontStyle = 'bold';
          } else if (role === 'Admin') {
            data.cell.styles.textColor = C.blue600;
            data.cell.styles.fontStyle = 'bold';
          } else {
            // Customer
            data.cell.styles.textColor = C.sky500;
            data.cell.styles.fontStyle = 'normal';
          }
        }

        // Status 
        if (data.section === 'body' && data.column.index === 4) {
          const status = String(data.cell.raw);
          if (status === 'Active') {
            data.cell.styles.textColor = C.emerald600;
            data.cell.styles.fontStyle = 'bold';
          } else if (status === 'Blocked') {
            data.cell.styles.textColor = C.red500;
            data.cell.styles.fontStyle = 'bold';
          } else {
            data.cell.styles.textColor = C.amber500;
            data.cell.styles.fontStyle = 'bold';
          }
        }
      },

      didDrawCell: (data) => {
        // Row number badge 
        if (data.section === 'body' && data.column.index === 0) {
          const cx = data.cell.x + data.cell.width / 2;
          const cy = data.cell.y + data.cell.height / 2;
          doc.setFillColor(...C.slate100);
          doc.roundedRect(cx - 10, cy - 8, 20, 16, 4, 4, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(...C.slate500);
          doc.text(String(data.row.index + 1), cx, cy + 2.8, { align: 'center' });
        }

        // Role pill 
        if (data.section === 'body' && data.column.index === 3) {
          const role = String(data.cell.raw);
          const cx = data.cell.x + data.cell.width / 2;
          const cy = data.cell.y + data.cell.height / 2;
          const pw = 58,
            ph = 16;

          let bg: [number, number, number];
          let border: [number, number, number];
          let text: [number, number, number];

          if (role === 'SuperAdmin') {
            bg = C.violet50;
            border = C.violet100;
            text = C.violet600;
          } else if (role === 'Admin') {
            bg = C.blue50;
            border = C.blue100;
            text = C.blue600;
          } else {
            bg = C.sky50;
            border = C.sky100;
            text = C.sky500;
          }

          doc.setFillColor(...bg);
          doc.roundedRect(cx - pw / 2, cy - ph / 2, pw, ph, 8, 8, 'F');
          doc.setDrawColor(...border);
          doc.setLineWidth(0.6);
          doc.roundedRect(cx - pw / 2, cy - ph / 2, pw, ph, 8, 8, 'S');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(...text);
          doc.text(role, cx, cy + 2.8, { align: 'center' });
        }

        // Status pill 
        if (data.section === 'body' && data.column.index === 4) {
          const status = String(data.cell.raw);
          const cx = data.cell.x + data.cell.width / 2;
          const cy = data.cell.y + data.cell.height / 2;
          const pw = 52,
            ph = 16;

          let bg: [number, number, number];
          let border: [number, number, number];
          let text: [number, number, number];
          let dot: [number, number, number];

          if (status === 'Active') {
            bg = C.emerald50;
            border = C.emerald200;
            text = C.emerald600;
            dot = C.emerald500;
          } else if (status === 'Blocked') {
            bg = C.red50;
            border = C.red100;
            text = C.red500;
            dot = C.red500;
          } else {
            bg = C.amber50;
            border = C.amber100;
            text = C.amber500;
            dot = C.amber500;
          }

          doc.setFillColor(...bg);
          doc.roundedRect(cx - pw / 2, cy - ph / 2, pw, ph, 8, 8, 'F');
          doc.setDrawColor(...border);
          doc.setLineWidth(0.6);
          doc.roundedRect(cx - pw / 2, cy - ph / 2, pw, ph, 8, 8, 'S');

          // dot indicator
          doc.setFillColor(...dot);
          doc.circle(cx - pw / 2 + 9, cy, 2.5, 'F');

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7.5);
          doc.setTextColor(...text);
          doc.text(status, cx + 3, cy + 2.8, { align: 'center' });
        }
      },

      // ==========================================
      // 5. FOOTER
      // ==========================================
      didDrawPage: (data) => {
        // Light footer bar
        doc.setFillColor(...C.slate50);
        doc.rect(0, H - 42, W, 42, 'F');

        // Top border of footer
        doc.setDrawColor(...C.emerald200);
        doc.setLineWidth(1);
        doc.line(0, H - 42, W, H - 42);

        // Brand / Logo in footer
        if (logoBase64) {
          // logo in footer
          doc.addImage(logoBase64, 'PNG', 40, H - 33, 65, 23);
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(...C.slate500);
          doc.text('Enterprise Users Report', 115, H - 19);
        } else {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(...C.emerald600);
          doc.text('ZARAA', 40, H - 22);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(...C.slate500);
          doc.text('Enterprise Users Report', 40, H - 11);
        }

        // Confidential
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...C.slate300);
        doc.text('CONFIDENTIAL', W / 2, H - 17, { align: 'center' });

        // Page number
        const totalPages = (doc as any).internal.getNumberOfPages();
        doc.setFillColor(...C.emerald100);
        doc.roundedRect(W - 90, H - 33, 52, 18, 5, 5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(...C.emerald600);
        doc.text(`${data.pageNumber} / ${totalPages}`, W - 64, H - 21, { align: 'center' });
      },
    });

    doc.save(`zaraa-users-${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}

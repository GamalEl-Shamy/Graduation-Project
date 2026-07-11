import { Component, input, output } from '@angular/core';
import { ProductItem } from '../../models/product.interface';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { environment } from '../../../../../../environments/environment.development';
import { SlideIn } from "../../../../../shared/directives/slide-in";

@Component({
  selector: 'app-products-header',
  imports: [SlideIn],
  templateUrl: './products-header.component.html',
  styleUrl: './products-header.component.css',
})
export class ProductsHeaderComponent {
  productsList = input.required<ProductItem[]>();

  onAddProductClick = output<void>();

  async exportToPDF() {
    const doc = new jsPDF('p', 'pt', 'a4');
    const W = doc.internal.pageSize.width;
    const H = doc.internal.pageSize.height;
    const products = this.productsList();

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
      slate400: [148, 163, 184] as [number, number, number],
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
    };

    // ==========================================
    // 0. PRELOAD IMAGES (Logo + Product Images)
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

    // جلب صور المنتجات وتحويلها لتكون جاهزة للرسم
    const productImages: Record<number, string> = {};
    await Promise.all(products.map(async (p) => {
      if (p.mainImg) {
        try {
          const cleanPath = p.mainImg.replace(/^\//, ''); 
          const imageUrl = `${environment.apiUrl}/Images/${cleanPath}`; 
          const res = await fetch(imageUrl);
          
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

          const blob = await res.blob();
          productImages[p.productId] = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        } catch (e) {
          console.warn(`Could not load image for product ${p.productId}:`, e);
        }
      }
    }));

    // ==========================================
    // 1. LIGHT HERO HEADER
    // ==========================================
    doc.setFillColor(...C.white);
    doc.rect(0, 0, W, 105, 'F');
    doc.setFillColor(...C.emerald500);
    doc.rect(0, 0, W, 4, 'F');

    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', W - 175, 22, 110, 40);
    } else {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(...C.emerald600);
      doc.text('ZARAA', W - 110, 52, { align: 'center' });
    }

    // Titles
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...C.slate900);
    doc.text('Products Report', 40, 45);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...C.emerald600);
    doc.text('Enterprise Inventory & Sales Management', 40, 62);

    doc.setFontSize(8);
    doc.setTextColor(...C.slate500);
    doc.text(
      `Generated: ${new Date().toLocaleString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long',
        day: 'numeric', hour: '2-digit', minute: '2-digit',
      })}`,
      40, 78
    );

    doc.setDrawColor(...C.emerald200);
    doc.setLineWidth(1);
    doc.line(40, 95, W - 40, 95);

    // ==========================================
    // 2. STATS CARDS
    // ==========================================
    const total = products.length;
    const active = products.filter(p => p.status === true).length;
    const inactive = total - active;
    const outOfStock = products.filter(p => p.quantity === 0).length;

    const cards = [
      { label: 'Total Products', value: total, accent: C.slate500, bg: C.slate50, border: C.slate200, bar: C.slate300 },
      { label: 'Active', value: active, accent: C.emerald600, bg: C.emerald50, border: C.emerald200, bar: C.emerald500 },
      { label: 'Inactive', value: inactive, accent: C.amber500, bg: C.amber50, border: C.amber100, bar: C.amber500 },
      { label: 'Out of Stock', value: outOfStock, accent: C.red500, bg: C.red50, border: C.red100, bar: C.red500 },
    ];

    const cardW = 118, cardH = 56, cardGap = 12;
    const cardsY = 112;

    cards.forEach((card, i) => {
      const x = 40 + i * (cardW + cardGap);
      doc.setFillColor(...card.bg);
      doc.roundedRect(x, cardsY, cardW, cardH, 7, 7, 'F');
      doc.setDrawColor(...card.border);
      doc.setLineWidth(0.8);
      doc.roundedRect(x, cardsY, cardW, cardH, 7, 7, 'S');
      doc.setFillColor(...card.bar);
      doc.roundedRect(x, cardsY, 3.5, cardH, 2, 2, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.setTextColor(...card.accent);
      doc.text(String(card.value), x + 16, cardsY + 30);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...C.slate500);
      doc.text(card.label, x + 16, cardsY + 44);
    });

    // ==========================================
    // 3. SECTION TITLE
    // ==========================================
    const tableStartY = cardsY + cardH + 22;

    doc.setFillColor(...C.emerald500);
    doc.roundedRect(40, tableStartY, 3.5, 15, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...C.slate900);
    doc.text('Product Catalog', 50, tableStartY + 11);

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
    const head = [['#', 'Img', 'Product Info', 'Category / Brand', 'Pricing', 'Stock Level', 'Status']];
    const data = products.map((product, idx) => {

      let pricingInfo = `$${product.priceAfterDiscount.toFixed(2)}`;
      if (product.discount > 0) {
        pricingInfo += `\n(Orig: $${product.price.toFixed(2)})\n-${product.discount}% OFF`;
      }

      let info = `${product.name}`;
      info += `\n#${product.productId}`;
      info += `\nRating: ${product.rate} / 5 (${product.reviewsCount} reviews)`;
      // if (product.description) {
      //   const shortDesc = product.description.length > 45 ? product.description.substring(0, 45) + '...' : product.description;
      //   info += `\nDesc: ${shortDesc}`;
      // }

      return [
        idx + 1,
        '',
        info,
        `${product.categoryName} / ${product.brandName}`,
        pricingInfo,
        `${product.quantity} Units`,
        product.status ? 'Active' : 'Inactive'
      ];
    });

    autoTable(doc, {
      head,
      body: data,
      startY: tableStartY + 25,
      theme: 'plain',
      margin: { top: 20, right: 40, bottom: 65, left: 40 },
      tableWidth: 'auto',

      headStyles: {
        fillColor: C.slate100, textColor: C.slate700, fontStyle: 'bold',
        fontSize: 8, cellPadding: { top: 9, bottom: 9, left: 10, right: 10 },
        valign: 'middle', lineColor: C.slate200, lineWidth: 0.5,
      },

      bodyStyles: {
        textColor: C.slate700, fontSize: 8, 
        cellPadding: { top: 10, bottom: 10, left: 10, right: 10 },
        valign: 'middle', lineColor: C.slate100, lineWidth: 0.5,
        minCellHeight: 45
      },

      alternateRowStyles: { fillColor: C.slate50 },

      columnStyles: {
        0: { halign: 'center', cellWidth: 25 }, 
        1: { halign: 'center', cellWidth: 45 }, 
        2: { cellWidth: 'auto', fontStyle: 'bold' },
        3: { halign: 'right', cellWidth: 80 },
        4: { halign: 'center', cellWidth: 65 }, 
        5: { halign: 'center', cellWidth: 70 }, 
      },

      didParseCell: (data) => {
        // ── Product Info Style ──
        if (data.section === 'body' && data.column.index === 2) {
          data.cell.styles.textColor = C.emerald600;
        }

        // ── Pricing Style ──
        if (data.section === 'body' && data.column.index === 4) {
          data.cell.styles.textColor = C.slate900;
        }

        // ── Stock Level Style ──
        if (data.section === 'body' && data.column.index === 5) {
          const stockText = String(data.cell.raw);
          if (stockText.startsWith('0')) {
            data.cell.styles.textColor = C.red500;
            data.cell.styles.fontStyle = 'bold';
          } else {
            data.cell.styles.textColor = C.slate500;
            data.cell.styles.fontStyle = 'bold';
          }
        }

        // ── Status Fallback Color ──
        if (data.section === 'body' && data.column.index === 6) {
          const status = String(data.cell.raw);
          if (status === 'Active') {
            data.cell.styles.textColor = C.emerald600;
          } else {
            data.cell.styles.textColor = C.slate500;
          }
          data.cell.styles.fontStyle = 'bold';
        }
      },

      didDrawCell: (data) => {
        // ── Row number badge ──
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

        // ── Draw Product Image ──
        if (data.section === 'body' && data.column.index === 1) {
          const prod = products[data.row.index];
          const base64 = productImages[prod.productId];
          const imgDim = 32; 
          const imgX = data.cell.x + (data.cell.width - imgDim) / 2;
          const imgY = data.cell.y + (data.cell.height - imgDim) / 2;

          if (base64) {
            try {
              doc.addImage(base64, imgX, imgY, imgDim, imgDim);
            } catch (e) {
              console.warn('Error drawing image in PDF for product', prod.productId);
            }
          } else {
            doc.setFillColor(...C.slate100);
            doc.roundedRect(imgX, imgY, imgDim, imgDim, 4, 4, 'F');
            doc.setFontSize(7);
            doc.setTextColor(...C.slate400);
            const cy = data.cell.y + data.cell.height / 2;
            doc.text('No Img', data.cell.x + data.cell.width / 2, cy + 2, { align: 'center' });
          }
        }

        // ── Status pill ──
        if (data.section === 'body' && data.column.index === 6) {
          const status = String(data.cell.raw);
          const cx = data.cell.x + data.cell.width / 2;
          const cy = data.cell.y + data.cell.height / 2;
          const pw = 56, ph = 16;

          let bg: [number, number, number];
          let border: [number, number, number];
          let text: [number, number, number];
          let dot: [number, number, number];

          if (status === 'Active') {
            bg = C.emerald50; border = C.emerald200; text = C.emerald600; dot = C.emerald500;
          } else {
            bg = C.slate100; border = C.slate300; text = C.slate500; dot = C.slate400;
          }

          doc.setFillColor(...bg);
          doc.roundedRect(cx - pw / 2, cy - ph / 2, pw, ph, 8, 8, 'F');
          doc.setDrawColor(...border);
          doc.setLineWidth(0.6);
          doc.roundedRect(cx - pw / 2, cy - ph / 2, pw, ph, 8, 8, 'S');

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
        doc.setFillColor(...C.slate50);
        doc.rect(0, H - 42, W, 42, 'F');
        doc.setDrawColor(...C.emerald200);
        doc.setLineWidth(1);
        doc.line(0, H - 42, W, H - 42);

        if (logoBase64) {
          doc.addImage(logoBase64, 'PNG', 40, H - 33, 65, 23);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(...C.slate500);
          doc.text('Enterprise Products Report', 115, H - 19);
        } else {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(...C.emerald600);
          doc.text('ZARAA', 40, H - 22);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(...C.slate500);
          doc.text('Enterprise Products Report', 40, H - 11);
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...C.slate300);
        doc.text('CONFIDENTIAL', W / 2, H - 17, { align: 'center' });

        const totalPages = (doc as any).internal.getNumberOfPages();
        doc.setFillColor(...C.emerald100);
        doc.roundedRect(W - 90, H - 33, 52, 18, 5, 5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(...C.emerald600);
        doc.text(`${data.pageNumber} / ${totalPages}`, W - 64, H - 21, { align: 'center' });
      },
    });

    doc.save(`zaraa-products-${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}

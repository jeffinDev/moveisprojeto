import jsPDF from 'jspdf';
import { CartItem } from '../types/furniture';

const drawRectangleWithDimensions = (doc: jsPDF, x: number, y: number, item: CartItem) => {
  const { width, height, depth } = item.customDimensions;
  
  // Calculate scale to fit rectangle in available space (max 120x80)
  const maxWidth = 120;
  const maxHeight = 80;
  const scaleW = maxWidth / Math.max(width, depth);
  const scaleH = maxHeight / height;
  const scale = Math.min(scaleW, scaleH, 0.5); // Max scale of 0.5 for readability
  
  const rectWidth = width * scale;
  const rectHeight = height * scale;
  const rectDepth = depth * scale;
  
  // Draw main rectangle (front view)
  doc.setDrawColor(139, 69, 19); // Brown color
  doc.setLineWidth(1);
  doc.rect(x, y, rectWidth, rectHeight);
  
  // Draw depth indicator (side view - dashed line)
  doc.setLineDashPattern([2, 2], 0);
  doc.rect(x + 10, y - 10, rectDepth, rectHeight);
  doc.setLineDashPattern([], 0); // Reset dash pattern
  
  // Add dimension labels
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  
  // Width label (bottom)
  doc.text(`${width} cm`, x + rectWidth/2, y + rectHeight + 8, { align: 'center' });
  
  // Height label (right side)
  doc.text(`${height} cm`, x + rectWidth + 5, y + rectHeight/2, { angle: 90 });
  
  // Depth label (top right)
  doc.text(`Prof: ${depth} cm`, x + rectWidth + 15, y - 5);
  
  // Add arrows for dimensions
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.5);
  
  // Width arrows
  doc.line(x, y + rectHeight + 4, x + rectWidth, y + rectHeight + 4);
  doc.line(x, y + rectHeight + 2, x, y + rectHeight + 6);
  doc.line(x + rectWidth, y + rectHeight + 2, x + rectWidth, y + rectHeight + 6);
  
  // Height arrows
  doc.line(x + rectWidth + 2, y, x + rectWidth + 2, y + rectHeight);
  doc.line(x + rectWidth, y, x + rectWidth + 4, y);
  doc.line(x + rectWidth, y + rectHeight, x + rectWidth + 4, y + rectHeight);
  
  return y + rectHeight + 20; // Return new Y position
};

export const generatePDF = (cartItems: CartItem[], customerInfo: any) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  let yPosition = 20;

  // Header
  doc.setFontSize(20);
  doc.setTextColor(139, 69, 19); // Brown color
  doc.text('ESPECIFICAÇÕES PARA MARCENEIRO', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  
  // Customer info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Cliente: ${customerInfo.name}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Telefone: ${customerInfo.phone}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Email: ${customerInfo.email}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, yPosition);
  
  yPosition += 20;

  // Items
  cartItems.forEach((item, index) => {
    // Check if we need a new page
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.setTextColor(139, 69, 19);
    doc.text(`${index + 1}. ${item.name}`, 20, yPosition);
    yPosition += 10;

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Categoria: ${item.category}`, 30, yPosition);
    yPosition += 6;
    doc.text(`Quantidade: ${item.quantity} unidade(s)`, 30, yPosition);
    yPosition += 6;
    doc.text(`Descrição: ${item.description}`, 30, yPosition);
    yPosition += 8;

    // Draw rectangle with dimensions
    doc.setFontSize(12);
    doc.setTextColor(34, 139, 34);
    doc.text('DESENHO TÉCNICO:', 30, yPosition);
    yPosition += 10;
    
    yPosition = drawRectangleWithDimensions(doc, 40, yPosition, item);

    // Dimensions
    doc.setFontSize(12);
    doc.setTextColor(34, 139, 34); // Green color
    doc.text('MEDIDAS PERSONALIZADAS:', 30, yPosition);
    yPosition += 8;
    
    doc.setTextColor(0, 0, 0);
    doc.text(`• Largura: ${item.customDimensions.width} cm`, 40, yPosition);
    yPosition += 6;
    doc.text(`• Altura: ${item.customDimensions.height} cm`, 40, yPosition);
    yPosition += 6;
    doc.text(`• Profundidade: ${item.customDimensions.depth} cm`, 40, yPosition);
    yPosition += 8;

    if (item.observations) {
      doc.text(`Observações: ${item.observations}`, 30, yPosition);
      yPosition += 8;
    }

    doc.text(`Valor unitário: R$ ${item.finalPrice.toFixed(2)}`, 30, yPosition);
    doc.text(`Total item: R$ ${(item.finalPrice * item.quantity).toFixed(2)}`, 30, yPosition + 6);
    yPosition += 20;
  });

  // Total
  const total = cartItems.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
  
  // Check if we need space for total
  if (yPosition > 270) {
    doc.addPage();
    yPosition = 20;
  }
  
  doc.setFontSize(14);
  doc.setTextColor(139, 69, 19);
  doc.text(`TOTAL GERAL: R$ ${total.toFixed(2)}`, pageWidth - 20, yPosition, { align: 'right' });

  // Save the PDF
  doc.save(`orcamento-moveis-${new Date().getTime()}.pdf`);
};
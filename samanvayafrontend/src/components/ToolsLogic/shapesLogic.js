export const drawShape = (shape, context, startX, startY, endX, endY, options, selectedColor = {}) => {
    if (!context) return;

    const { strokeColor = selectedColor, fillColor = null } = options;

    context.strokeStyle = strokeColor;
    if (fillColor) {
      context.fillStyle = fillColor;
    }

    const width = endX - startX;
    const height = endY - startY;

    context.save();
    switch (shape) {
      case "Circle":
        const radius = Math.sqrt(width * width + height * height) / 2;
        const centerX = (startX + endX) / 2;
        const centerY = (startY + endY) / 2;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        context.stroke();
        if (fillColor) context.fill();
        break;

      case "Square":
        context.strokeRect(startX, startY, width, height);
        if (fillColor) {
          context.fillRect(startX, startY, width, height);
        }
        break;

      case "Triangle":
        context.beginPath();
        context.moveTo(startX + width / 2, startY);
        context.lineTo(startX, endY);
        context.lineTo(endX, endY);
        context.closePath();
        context.stroke();
        if (fillColor) context.fill();
        break;

      default:
        console.error("Unknown shape");
    }
    context.restore();
  };

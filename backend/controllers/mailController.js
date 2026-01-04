const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
    },
});

const buildOrderConfirmationTemplate = (order) => {
    const itemsHtml = order.items
        .map(
            (item) => `
      <tr>
        <td style="padding:12px 0; border-bottom:1px solid #e5e7eb;">
          <strong>${item.product.title}</strong><br/>
          <span style="color:#6b7280; font-size:13px;">
            Quantity: ${item.quantity}
          </span>
        </td>
        <td align="right" style="padding:12px 0; border-bottom:1px solid #e5e7eb;">
          ₹${item.price.toLocaleString("en-IN")}
        </td>
      </tr>
    `
        )
        .join("");

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Order Confirmation</title>
</head>

<body style="margin:0; padding:0; background:#f6f7fb; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:#000000; padding:28px; text-align:center;">
              <h1 style="color:#ffffff; margin:0;">MERN-Mart</h1>
              <p style="color:#d1d5db; margin-top:6px; font-size:14px;">
                Thank you for shopping with us
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 12px;">Order Confirmed 🎉</h2>
              <p style="color:#374151; font-size:15px; line-height:1.6;">
                We’ve received your order and are preparing it for shipment.
                We hope to see you shopping with <strong>MERN-Mart</strong> again!
              </p>

              <div style="margin:24px 0; padding:16px; background:#f9fafb; border-radius:10px;">
                <p style="margin:0; font-size:14px;">
                  <strong>Order ID:</strong> ${order._id}<br/>
                  <strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>

              <!-- Items -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                <tr>
                  <th align="left" style="padding-bottom:12px;">Item</th>
                  <th align="right" style="padding-bottom:12px;">Price</th>
                </tr>

                ${itemsHtml}

                <tr>
                  <td style="padding-top:16px; font-weight:bold;">Total</td>
                  <td align="right" style="padding-top:16px; font-weight:bold;">
                    ₹${order.totalAmount.toLocaleString("en-IN")}
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="text-align:center; margin-top:32px;">
                <a href="http://localhost:5173/orders"
                  style="display:inline-block; padding:14px 26px; background:#000000; color:#ffffff; text-decoration:none; border-radius:30px; font-size:14px;">
                  View Your Order
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:20px; text-align:center; font-size:13px; color:#6b7280;">
              © ${new Date().getFullYear()} MERN-Mart · Happy Shopping 🛒
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};


module.exports.orderConfirmation = async (order, user) => {
    try {
        await transporter.sendMail({
            from: '"MERN-Mart" <no-reply@mernmart.com>',
            to: user.email,
            subject: "Your MERN-Mart Order is Confirmed 🎉",
            html: buildOrderConfirmationTemplate(order),
        });


    } catch (error) {
        console.error("Order confirmation email failed:", error);
    }
};

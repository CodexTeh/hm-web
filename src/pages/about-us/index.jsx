import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import Footer from 'components/Footer';
import { GetLanguage } from "redux-state/selectors";

const AboutUs = () => {
  const language = GetLanguage();
  const rtl = language === "ar";

  return (
    <>
    <Container
      maxWidth="md"
      sx={{
        mt: 12,
        mb: 4,
        direction: rtl ? "rtl" : "ltr",
        textAlign: rtl ? "right" : "left",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Title */}
        <Typography variant="h4" gutterBottom>
          {rtl ? "من نحن" : "About Us"}
        </Typography>

        {/* Paragraph 1 */}
        <Typography paragraph>
          {rtl ? (
            <>
              تأسست شركة حسين مقعبيل عوني في عام 1984، وأصبحت اسمًا رائدًا في مجال أساسيات المطبخ
              وديكور المنزل. على مر السنين، جعل التزامنا بالجودة والحرفية ورضا العملاء منا خيارًا
              موثوقًا به لأصحاب المنازل ومصممي الديكور الداخلي وهواة الطهي على حدٍ سواء.
            </>
          ) : (
            <>
              Established in 1984, Hussain Muqaibal Awani has become a leading name in the industry
              of kitchen essentials and home décor. Over the years, our commitment to quality,
              craftsmanship, and customer satisfaction has made us a trusted choice for homeowners,
              interior designers, and kitchen enthusiasts alike.
            </>
          )}
        </Typography>

        {/* Paragraph 2 */}
        <Typography paragraph>
          {rtl ? (
            <>
              في حسين مقعبيل عوني، نتخصص في توفير مجموعة واسعة من أدوات المطبخ الراقية والإكسسوارات
              ومنتجات الديكور المنزلي الأنيقة التي تجمع بين الوظائف والأناقة. سواء كنت تقوم بتجهيز
              مطبخ جديد أو إعادة تصميم منزلك أو تبحث عن الهدايا المثالية، فإننا نقدم مجموعة واسعة
              من المنتجات لتلبية احتياجاتك. تم تصميم عروضنا لتوفير الراحة وتعزيز جمالية مساحات
              المعيشة لديك.
            </>
          ) : (
            <>
              At Hussain Muqaibal Awani, we specialize in providing an extensive range of premium
              kitchen tools, accessories, and stylish home décor products that blend functionality
              with elegance. Whether you are setting up a new kitchen, redecorating your home, or
              looking for the perfect gifts, we offer a wide selection of products to meet your
              needs. Our offerings are designed to not only add convenience but also elevate the
              aesthetics of your living spaces.
            </>
          )}
        </Typography>

        {/* Paragraph 3 */}
        <Typography paragraph>
          {rtl ? (
            <>
              بدأت رحلتنا برؤية بسيطة ولكنها قوية: تقديم منتجات عالية الجودة وموثوقة ومبتكرة تعزز
              الحياة اليومية. نحن فخورون اليوم بأننا خدمنا عددًا لا يحصى من العملاء الراضين، الذين
              يثقون بنا نظرًا لاهتمامنا بالتفاصيل والتزامنا بالتميز.
            </>
          ) : (
            <>
              Our journey began with a simple yet powerful vision: to offer high-quality, reliable,
              and innovative products that enhance daily living. Today, we are proud to have served
              countless satisfied customers, all of whom trust us for our attention to detail and
              dedication to excellence.
            </>
          )}
        </Typography>

        {/* What We Do Section */}
        <Typography variant="h5" gutterBottom>
          {rtl ? "ما نقدمه" : "What We Do"}
        </Typography>
        <Typography paragraph>
          {rtl ? (
            <>
              نقدم لك أفضل مستلزمات المطبخ، من أواني الطهي المتينة والأدوات إلى أحدث الأجهزة
              المبتكرة التي تساعدك على إنشاء مساحة طهي عملية وأنيقة في آنٍ واحد. بالإضافة إلى ذلك،
              يقدم قسم الديكور المنزلي لدينا كل شيء من العناصر الزخرفية إلى قطع الأثاث التي تضفي
              الدفء والتميز على منزلك.
            </>
          ) : (
            <>
              We bring you the best of kitchen essentials, from durable cookware and utensils to the
              latest in kitchen gadgets, helping you create a cooking space that is both functional
              and stylish. In addition, our home décor collection offers everything from decorative
              items to furniture pieces that add warmth and character to your home.
            </>
          )}
        </Typography>

        {/* Our Values Section */}
        <Typography variant="h5" gutterBottom>
          {rtl ? "قيمنا" : "Our Values"}
        </Typography>
        <Box component="ul">
          <li>
            {rtl ? (
              <>
                <strong>الجودة أولاً:</strong> نؤمن بتقديم أفضل المنتجات فقط، المختارة بعناية لتلبية
                أعلى معايير المتانة والتصميم.
              </>
            ) : (
              <>
                <strong>Quality First:</strong> We believe in delivering only the finest products,
                carefully selected to meet the highest standards of durability and design.
              </>
            )}
          </li>
          <li>
            {rtl ? (
              <>
                <strong>تركز على العميل:</strong> عملاؤنا هم محور كل ما نقوم به. نسعى لتقديم تجربة
                تسوق سلسة وخدمة شخصية.
              </>
            ) : (
              <>
                <strong>Customer-Centric:</strong> Our customers are at the heart of everything we
                do. We aim to provide a seamless shopping experience and personalized service.
              </>
            )}
          </li>
          <li>
            {rtl ? (
              <>
                <strong>الابتكار:</strong> نبقى مطلعين على أحدث الاتجاهات لنقدم لكم أحدث المنتجات
                المبتكرة التي تحسن من طريقة العيش والطهي.
              </>
            ) : (
              <>
                <strong>Innovation:</strong> We stay ahead of trends to bring you the latest and
                most innovative products that improve the way you live and cook.
              </>
            )}
          </li>
          <li>
            {rtl ? (
              <>
                <strong>الاستدامة:</strong> نحن ملتزمون بممارسات صديقة للبيئة، ونقدم منتجات
                مستدامة ومسؤولة.
              </>
            ) : (
              <>
                <strong>Sustainability:</strong> We are committed to eco-friendly practices,
                offering products that are both sustainable and responsible.
              </>
            )}
          </li>
        </Box>

        {/* Our Mission */}
        <Typography variant="h5" gutterBottom>
          {rtl ? "رسالتنا" : "Our Mission"}
        </Typography>
        <Typography paragraph>
          {rtl ? (
            <>
              تقديم أفضل مستلزمات المطبخ ومنتجات الديكور المنزلي التي تجمع بين الأسلوب والجودة
              والوظائف، وتحول المساحات اليومية إلى أماكن استثنائية.
            </>
          ) : (
            <>
              To provide top-notch kitchen essentials and home décor products that combine style,
              quality, and functionality, transforming everyday spaces into extraordinary ones.
            </>
          )}
        </Typography>

        {/* Our Vision */}
        <Typography variant="h5" gutterBottom>
          {rtl ? "رؤيتنا" : "Our Vision"}
        </Typography>
        <Typography paragraph>
          {rtl ? (
            <>
              أن نكون الوجهة الأولى على الإنترنت لكل ما يخص المطبخ والديكور المنزلي، وأن نقدم
              للعملاء تجربة تسوق سلسة وجودة لا مثيل لها وقيمة ممتازة مقابل المال.
            </>
          ) : (
            <>
              To be the go-to online destination for all things kitchen and home décor, offering
              customers a seamless shopping experience, unmatched quality, and exceptional value for
              money.
            </>
          )}
        </Typography>

        {/* Conclusion */}
        <Typography paragraph>
          {rtl ? (
            <>
              شكرًا لاختيارك حسين مقعبيل عوني. سواء كنت تتصفح لشراء قطعة واحدة أو تعيد تصميم
              مساحتك بالكامل، نحن هنا لمساعدتك في جعل منزلك مكانًا أجمل وأكثر عملية ومتعة.
            </>
          ) : (
            <>
              Thank you for choosing Hussain Muqaibal Awani. Whether you’re browsing for a single
              item or redesigning your entire space, we’re here to help you make your home a more
              beautiful, functional, and enjoyable place to be.
            </>
          )}
        </Typography>
      </Paper>
    </Container>
          <Footer />
    </>
  );
};

export default AboutUs;

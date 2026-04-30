import type { Metadata } from "next";




// Metadata por página - Páginas públicas (indexables)
export const publicPagesSeo: Record<string, Metadata> = {
  // Página principal (Inicio)
  home: {
    title: "Compra Electrodomésticos Muebles e Iluminación | Tienda Fadiar",
    description:
      "Descubre productos de calidad para tu hogar en la tienda oficial de Fadiar. Electrodomésticos, mobiliario e iluminación con envíos a toda Cuba. Compra online fácil y seguro.",
    keywords: [
      "electrodomésticos Cuba",
      "muebles Cuba",
      "iluminación",
      "tienda online Cuba",
      "Fadiar",
      "comprar online Cuba",
      "electrodomésticos venta",
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "Compra Electrodomésticos Muebles e Iluminación | Tienda Fadiar",
      description:
        "Descubre productos de calidad para tu hogar en la tienda oficial de Fadiar.",
      url: "/",
      siteName: "Tienda Fadiar",
      locale: "es_ES",
      type: "website",
    },
  },

  // Sobre nosotros
  about: {
    title: "Sobre nosotros | Quiénes somos | Tienda Fadiar",
    description:
      "Conoce la historia y los valores de Fadiar. Somos una tienda comprometida con la calidad y la satisfacción de nuestros clientes en Cuba.",
    keywords: [
      "sobre Fadiar",
      "quienes somos",
      "historia Fadiar",
      "valores empresa Cuba",
      "nosotros Fadiar",
    ],
    alternates: {
      canonical: "/about",
    },
    openGraph: {
      title: "Sobre nosotros | Quiénes somos | Tienda Fadiar",
      description: "Conoce la historia y los valores de Fadiar.",
      url: "/about",
      siteName: "Tienda Fadiar",
      locale: "es_ES",
      type: "website",
    },
  },

  // Preguntas frecuentes
  faq: {
    title: "Preguntas frecuentes | Ayuda y dudas | Tienda Fadiar",
    description:
      "Resuelve tus dudas sobre compras, envíos, garantías y devoluciones. Respuestas rápidas a las preguntas más comunes sobre nuestra tienda.",
    keywords: [
      "FAQ",
      "preguntas frecuentes",
      "ayuda compras Cuba",
      "dudas tienda",
      "soporte cliente",
      "preguntas tienda online",
    ],
    alternates: {
      canonical: "/faq",
    },
    openGraph: {
      title: "Preguntas frecuentes | Ayuda y dudas | Tienda Fadiar",
      description: "Resuelve tus dudas sobre compras, envíos, garantías y devoluciones.",
      url: "/faq",
      siteName: "Tienda Fadiar",
      locale: "es_ES",
      type: "website",
    },
  },

  // Garantía
  warranty: {
    title: "Garantía de 3 años | Productos Fadiar | Garantía extendida",
    description:
      "Todos los productos Fadiar cuentan con garantía de 3 años contra defectos de fabricación. Conoce los términos y condiciones de nuestra garantía.",
    keywords: [
      "garantía electrodomésticos",
      "garantía 3 años",
      "política garantía Cuba",
      "reparación productos",
      "garantía extendida",
      "términos garantía",
    ],
    alternates: {
      canonical: "/warranty",
    },
    openGraph: {
      title: "Garantía de 3 años | Productos Fadiar | Garantía extendida",
      description:
        "Todos los productos Fadiar cuentan con garantía de 3 años contra defectos de fabricación.",
      url: "/warranty",
      siteName: "Tienda Fadiar",
      locale: "es_ES",
      type: "website",
    },
  },

  // Envíos
  shipping: {
    title: "Envíos a toda Cuba | Plazos y costos | Tienda Fadiar",
    description:
      "Consulta los plazos de entrega, costos de envío y zonas de cobertura. Realiza tu compra online y recíbela en tu domicilio en toda Cuba.",
    keywords: [
      "envíos Cuba",
      "entrega a domicilio",
      "plazos entrega",
      "costos envío",
      "envío electrodomésticos",
      "zonas cobertura Cuba",
    ],
    alternates: {
      canonical: "/shipping",
    },
    openGraph: {
      title: "Envíos a toda Cuba | Plazos y costos | Tienda Fadiar",
      description:
        "Consulta los plazos de entrega, costos de envío y zonas de cobertura.",
      url: "/shipping",
      siteName: "Tienda Fadiar",
      locale: "es_ES",
      type: "website",
    },
  },

  // Contacto
  contact: {
    title: "Contacto | Atención al cliente | Tienda Fadiar",
    description:
      "Comunícate con nuestro equipo de atención al cliente. Teléfono, correo electrónico y formulario de contacto disponibles para ayudarte.",
    keywords: [
      "contacto Fadiar",
      "atención cliente",
      "teléfono tienda",
      "soporte",
      "ayuda",
      "escribir a Fadiar",
    ],
    alternates: {
      canonical: "/contact",
    },
    openGraph: {
      title: "Contacto | Atención al cliente | Tienda Fadiar",
      description:
        "Comunícate con nuestro equipo de atención al cliente. Teléfono, correo y formulario.",
      url: "/contact",
      siteName: "Tienda Fadiar",
      locale: "es_ES",
      type: "website",
    },
  },

  // Catálogo de productos
  products: {
    title: "Catálogo de productos | Electrodomésticos y más | Tienda Fadiar",
    description:
      "Explora nuestro catálogo completo de electrodomésticos, muebles e iluminación. Filtra por categoría, marca y precio. Envíos a toda Cuba.",
    keywords: [
      "catálogo productos",
      "tienda online Cuba",
      "electrodomésticos venta",
      "comprar muebles Cuba",
      "iluminación LED",
      "productos Cuba",
    ],
    alternates: {
      canonical: "/products",
    },
    openGraph: {
      title: "Catálogo de productos | Electrodomésticos y más | Tienda Fadiar",
      description:
        "Explora nuestro catálogo completo de electrodomésticos, muebles e iluminación.",
      url: "/products",
      siteName: "Tienda Fadiar",
      locale: "es_ES",
      type: "website",
    },
  },
};

// Metadata por página - Páginas privadas (no indexables)
export const privatePagesSeo: Record<string, Metadata> = {
  // Carrito de compras (Paso 1)
  cart1: {
    title: "Carrito de compras | Tus productos seleccionados | Tienda Fadiar",
    description:
      "Revisa los productos que has añadido a tu carrito de compras. Modifica cantidades o procede al pago de forma segura.",
    keywords: [
      "carrito compras",
      "mi carrito",
      "productos seleccionados",
      "comprar online Cuba",
    ],
    robots: {
      index: false,
      follow: true,
      noarchive: true,
    },
  },

  // Formas de pago (Paso 2)
  cart2: {
    title: "Finalizar compra | Métodos de pago | Tienda Fadiar",
    description:
      "Elige tu método de pago preferido y completa tu compra de forma segura. Múltiples opciones de pago disponibles.",
    keywords: ["métodos pago", "pagar compra", "opciones pago Cuba", "checkout"],
    robots: {
      index: false,
      follow: true,
      noarchive: true,
    },
  },

  // Confirmación de pedido (Paso 3)
  cart3: {
    title: "Confirmación de pedido | Compra completada | Tienda Fadiar",
    description:
      "Tu pedido ha sido procesado correctamente. Recibirás confirmación por correo con los detalles de tu compra.",
    keywords: ["confirmación pedido", "compra exitosa", "orden completada"],
    robots: {
      index: false,
      follow: true,
      noarchive: true,
    },
  },

  // Mis Pedidos
  orders: {
    title: "Mis Pedidos | Historial de compras | Tienda Fadiar",
    description:
      "Consulta el estado de tus pedidos y tu historial de compras. Seguimiento en tiempo real de tus órdenes.",
    keywords: [
      "mis pedidos",
      "historial compras",
      "estado orden",
      "seguimiento pedido",
    ],
    robots: {
      index: false,
      follow: true,
      noarchive: true,
    },
  },

  // Mi Perfil
  myProfile: {
    title: "Mi Perfil | Gestiona tu cuenta | Tienda Fadiar",
    description:
      "Administra tu información personal, direcciones y preferencias de cuenta. Configura tu perfil de cliente.",
    keywords: [
      "mi perfil",
      "cuenta usuario",
      "datos personales",
      "configuración cuenta",
    ],
    robots: {
      index: false,
      follow: true,
      noarchive: true,
    },
  },

  // Autenticación (login, registro, recuperación)
  auth: {
    title: "Acceso de usuarios | Iniciar sesión o registrarse | Tienda Fadiar",
    description:
      "Accede a tu cuenta de cliente para comprar, gestionar pedidos y actualizar tus datos personales. Inicia sesión o crea una nueva cuenta en Tienda Fadiar.",
    keywords: [
      "iniciar sesión",
      "login",
      "registro",
      "acceso cuenta",
      "autenticación",
    ],
    robots: {
      index: false,
      follow: true,
      noarchive: true,
    },
  },
};

// Metadata para páginas dinámicas (productos)
export const dynamicPagesSeo = {
  // Producto individual
  product: {
    titleTemplate: (productName: string, brand?: string) =>
      `${productName}${brand ? ` | ${brand}` : ""} | Tienda Fadiar`,
    descriptionTemplate: (productName: string, brand?: string, warranty?: string) =>
      `Compra ${productName}${brand ? ` de ${brand}` : ""} en Tienda Fadiar.${warranty ? ` ${warranty}.` : ""} Envío a toda Cuba. Compra online segura.`,
    default: {
      title: "Producto | Detalles y especificaciones | Tienda Fadiar",
      description:
        "Descubre las características, especificaciones y precio de este producto. Compra online con envío a toda Cuba.",
      keywords: ["producto", "detalles", "especificaciones", "comprar online"],
    } as Metadata,
  },
};

// Exportar todas juntas para uso general
export const allPagesSeo: Record<string, Metadata> = {
  ...publicPagesSeo,
  ...privatePagesSeo,
};

// Helper para verificar si una página es pública
export const isPublicPage = (pageName: string): boolean => {
  return pageName in publicPagesSeo;
};

// Helper para obtener metadata por nombre de página
export const getPageMetadata = (pageName: string): Metadata => {
  return allPagesSeo[pageName] || publicPagesSeo.home;
};

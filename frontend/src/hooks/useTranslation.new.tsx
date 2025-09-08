"use client";

import { createContext, useContext, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

export const supportedLocales = [
  "en",
  "vi",
  "es",
  "fr",
  "de",
  "ja",
  "ko",
  "zh",
];

interface Translations {
  [key: string]: {
    [locale: string]: string;
  };
}

const translations: Translations = {
  // Navigation
  "nav.home": {
    en: "Home",
    vi: "Trang chủ",
    es: "Inicio",
    fr: "Accueil",
    de: "Startseite",
    ja: "ホーム",
    ko: "홈",
    zh: "首页",
  },
  "nav.products": {
    en: "Products",
    vi: "Sản phẩm",
    es: "Productos",
    fr: "Produits",
    de: "Produkte",
    ja: "商品",
    ko: "제품",
    zh: "产品",
  },
  "nav.categories": {
    en: "Categories",
    vi: "Danh mục",
    es: "Categorías",
    fr: "Catégories",
    de: "Kategorien",
    ja: "カテゴリー",
    ko: "카테고리",
    zh: "分类",
  },
  "nav.cart": {
    en: "Cart",
    vi: "Giỏ hàng",
    es: "Carrito",
    fr: "Panier",
    de: "Warenkorb",
    ja: "カート",
    ko: "장바구니",
    zh: "购物车",
  },
  "nav.login": {
    en: "Login",
    vi: "Đăng nhập",
    es: "Iniciar sesión",
    fr: "Se connecter",
    de: "Anmelden",
    ja: "ログイン",
    ko: "로그인",
    zh: "登录",
  },
  "nav.register": {
    en: "Register",
    vi: "Đăng ký",
    es: "Registrarse",
    fr: "S'inscrire",
    de: "Registrieren",
    ja: "登録",
    ko: "회원가입",
    zh: "注册",
  },
  "nav.profile": {
    en: "Profile",
    vi: "Hồ sơ",
    es: "Perfil",
    fr: "Profil",
    de: "Profil",
    ja: "プロフィール",
    ko: "프로필",
    zh: "个人资料",
  },
  "nav.admin": {
    en: "Admin",
    vi: "Quản trị",
    es: "Administrador",
    fr: "Administrateur",
    de: "Administrator",
    ja: "管理者",
    ko: "관리자",
    zh: "管理员",
  },
  "nav.logout": {
    en: "Logout",
    vi: "Đăng xuất",
    es: "Cerrar sesión",
    fr: "Se déconnecter",
    de: "Abmelden",
    ja: "ログアウト",
    ko: "로그아웃",
    zh: "退出",
  },

  // Authentication
  "auth.login.title": {
    en: "Login",
    vi: "Đăng nhập",
    es: "Iniciar sesión",
    fr: "Se connecter",
    de: "Anmelden",
    ja: "ログイン",
    ko: "로그인",
    zh: "登录",
  },
  "auth.login.subtitle": {
    en: "Or create a new account",
    vi: "Hoặc tạo tài khoản mới",
    es: "O crear una nueva cuenta",
    fr: "Ou créer un nouveau compte",
    de: "Oder neues Konto erstellen",
    ja: "または新しいアカウントを作成",
    ko: "또는 새 계정 만들기",
    zh: "或创建新账户",
  },
  "auth.email": {
    en: "Email",
    vi: "Email",
    es: "Correo electrónico",
    fr: "E-mail",
    de: "E-Mail",
    ja: "メール",
    ko: "이메일",
    zh: "邮箱",
  },
  "auth.password": {
    en: "Password",
    vi: "Mật khẩu",
    es: "Contraseña",
    fr: "Mot de passe",
    de: "Passwort",
    ja: "パスワード",
    ko: "비밀번호",
    zh: "密码",
  },
  "auth.remember": {
    en: "Remember me",
    vi: "Ghi nhớ đăng nhập",
    es: "Recordarme",
    fr: "Se souvenir de moi",
    de: "Angemeldet bleiben",
    ja: "ログイン状態を保持",
    ko: "로그인 상태 유지",
    zh: "记住登录",
  },
  "auth.forgot": {
    en: "Forgot password?",
    vi: "Quên mật khẩu?",
    es: "¿Olvidaste tu contraseña?",
    fr: "Mot de passe oublié ?",
    de: "Passwort vergessen?",
    ja: "パスワードを忘れた？",
    ko: "비밀번호를 잊으셨나요?",
    zh: "忘记密码？",
  },
  "auth.login.button": {
    en: "Sign In",
    vi: "Đăng nhập",
    es: "Iniciar sesión",
    fr: "Se connecter",
    de: "Anmelden",
    ja: "ログイン",
    ko: "로그인",
    zh: "登录",
  },
  "auth.login.loading": {
    en: "Signing in...",
    vi: "Đang đăng nhập...",
    es: "Iniciando sesión...",
    fr: "Connexion en cours...",
    de: "Anmeldung läuft...",
    ja: "ログイン中...",
    ko: "로그인 중...",
    zh: "登录中...",
  },
  "auth.social.or": {
    en: "Or sign in with",
    vi: "Hoặc đăng nhập với",
    es: "O iniciar sesión con",
    fr: "Ou se connecter avec",
    de: "Oder anmelden mit",
    ja: "またはログイン",
    ko: "또는 로그인",
    zh: "或者登录",
  },

  // Products
  "products.featured": {
    en: "Featured Products",
    vi: "Sản phẩm nổi bật",
    es: "Productos destacados",
    fr: "Produits vedettes",
    de: "Empfohlene Produkte",
    ja: "おすすめ商品",
    ko: "추천 상품",
    zh: "推荐产品",
  },
  "products.price": {
    en: "Price",
    vi: "Giá",
    es: "Precio",
    fr: "Prix",
    de: "Preis",
    ja: "価格",
    ko: "가격",
    zh: "价格",
  },
  "products.stock": {
    en: "In Stock",
    vi: "Còn hàng",
    es: "En stock",
    fr: "En stock",
    de: "Auf Lager",
    ja: "在庫あり",
    ko: "재고 있음",
    zh: "有库存",
  },
  "products.outOfStock": {
    en: "Out of Stock",
    vi: "Hết hàng",
    es: "Agotado",
    fr: "Rupture de stock",
    de: "Ausverkauft",
    ja: "在庫切れ",
    ko: "품절",
    zh: "缺货",
  },
  "products.addToCart": {
    en: "Add to Cart",
    vi: "Thêm vào giỏ",
    es: "Agregar al carrito",
    fr: "Ajouter au panier",
    de: "In den Warenkorb",
    ja: "カートに追加",
    ko: "장바구니에 추가",
    zh: "加入购物车",
  },
  "products.buyNow": {
    en: "Buy Now",
    vi: "Mua ngay",
    es: "Comprar ahora",
    fr: "Acheter maintenant",
    de: "Jetzt kaufen",
    ja: "今すぐ購入",
    ko: "지금 구매",
    zh: "立即购买",
  },
  "products.viewDetails": {
    en: "View Details",
    vi: "Xem chi tiết",
    es: "Ver detalles",
    fr: "Voir les détails",
    de: "Details anzeigen",
    ja: "詳細を見る",
    ko: "자세히 보기",
    zh: "查看详情",
  },

  // Cart
  "cart.title": {
    en: "Shopping Cart",
    vi: "Giỏ hàng",
    es: "Carrito de compras",
    fr: "Panier d'achat",
    de: "Einkaufswagen",
    ja: "ショッピングカート",
    ko: "장바구니",
    zh: "购物车",
  },
  "cart.empty": {
    en: "Your cart is empty",
    vi: "Giỏ hàng của bạn đang trống",
    es: "Tu carrito está vacío",
    fr: "Votre panier est vide",
    de: "Ihr Warenkorb ist leer",
    ja: "カートは空です",
    ko: "장바구니가 비어있습니다",
    zh: "您的购物车是空的",
  },
  "cart.quantity": {
    en: "Quantity",
    vi: "Số lượng",
    es: "Cantidad",
    fr: "Quantité",
    de: "Menge",
    ja: "数量",
    ko: "수량",
    zh: "数量",
  },
  "cart.subtotal": {
    en: "Subtotal",
    vi: "Tạm tính",
    es: "Subtotal",
    fr: "Sous-total",
    de: "Zwischensumme",
    ja: "小計",
    ko: "소계",
    zh: "小计",
  },
  "cart.shipping": {
    en: "Shipping",
    vi: "Phí vận chuyển",
    es: "Envío",
    fr: "Livraison",
    de: "Versand",
    ja: "送料",
    ko: "배송비",
    zh: "运费",
  },
  "cart.total": {
    en: "Total",
    vi: "Tổng cộng",
    es: "Total",
    fr: "Total",
    de: "Gesamt",
    ja: "合計",
    ko: "총계",
    zh: "总计",
  },
  "cart.checkout": {
    en: "Proceed to Checkout",
    vi: "Tiến hành thanh toán",
    es: "Proceder al pago",
    fr: "Procéder au paiement",
    de: "Zur Kasse gehen",
    ja: "チェックアウトに進む",
    ko: "결제 진행",
    zh: "去结账",
  },

  // Common
  "common.search": {
    en: "Search",
    vi: "Tìm kiếm",
    es: "Buscar",
    fr: "Rechercher",
    de: "Suchen",
    ja: "検索",
    ko: "검색",
    zh: "搜索",
  },
  "common.loading": {
    en: "Loading...",
    vi: "Đang tải...",
    es: "Cargando...",
    fr: "Chargement...",
    de: "Lädt...",
    ja: "読み込み中...",
    ko: "로딩 중...",
    zh: "加载中...",
  },
  "common.save": {
    en: "Save",
    vi: "Lưu",
    es: "Guardar",
    fr: "Enregistrer",
    de: "Speichern",
    ja: "保存",
    ko: "저장",
    zh: "保存",
  },
  "common.cancel": {
    en: "Cancel",
    vi: "Hủy",
    es: "Cancelar",
    fr: "Annuler",
    de: "Abbrechen",
    ja: "キャンセル",
    ko: "취소",
    zh: "取消",
  },
  "common.edit": {
    en: "Edit",
    vi: "Chỉnh sửa",
    es: "Editar",
    fr: "Modifier",
    de: "Bearbeiten",
    ja: "編集",
    ko: "편집",
    zh: "编辑",
  },
  "common.delete": {
    en: "Delete",
    vi: "Xóa",
    es: "Eliminar",
    fr: "Supprimer",
    de: "Löschen",
    ja: "削除",
    ko: "삭제",
    zh: "删除",
  },
  "common.back": {
    en: "Back",
    vi: "Quay lại",
    es: "Volver",
    fr: "Retour",
    de: "Zurück",
    ja: "戻る",
    ko: "뒤로",
    zh: "返回",
  },
  "common.next": {
    en: "Next",
    vi: "Tiếp theo",
    es: "Siguiente",
    fr: "Suivant",
    de: "Weiter",
    ja: "次へ",
    ko: "다음",
    zh: "下一步",
  },
  "common.close": {
    en: "Close",
    vi: "Đóng",
    es: "Cerrar",
    fr: "Fermer",
    de: "Schließen",
    ja: "閉じる",
    ko: "닫기",
    zh: "关闭",
  },

  // Error messages
  "error.required": {
    en: "This field is required",
    vi: "Trường này là bắt buộc",
    es: "Este campo es obligatorio",
    fr: "Ce champ est requis",
    de: "Dieses Feld ist erforderlich",
    ja: "この項目は必須です",
    ko: "이 필드는 필수입니다",
    zh: "此字段为必填项",
  },
  "error.email.invalid": {
    en: "Invalid email format",
    vi: "Email không hợp lệ",
    es: "Formato de correo inválido",
    fr: "Format d'e-mail invalide",
    de: "Ungültiges E-Mail-Format",
    ja: "無効なメール形式",
    ko: "유효하지 않은 이메일 형식",
    zh: "无效的邮箱格式",
  },
  "error.password.short": {
    en: "Password must be at least 6 characters",
    vi: "Mật khẩu phải có ít nhất 6 ký tự",
    es: "La contraseña debe tener al menos 6 caracteres",
    fr: "Le mot de passe doit contenir au moins 6 caractères",
    de: "Passwort muss mindestens 6 Zeichen haben",
    ja: "パスワードは6文字以上である必要があります",
    ko: "비밀번호는 최소 6자 이상이어야 합니다",
    zh: "密码至少需要6个字符",
  },

  // Hero Section
  "hero.title": {
    en: "Smart Shopping, Better Savings",
    vi: "Mua sắm thông minh, tiết kiệm hơn",
    es: "Compras inteligentes, mejores ahorros",
    fr: "Achats intelligents, économies meilleures",
    de: "Intelligentes Einkaufen, bessere Ersparnisse",
    ja: "スマートショッピング、より良い節約",
    ko: "스마트 쇼핑, 더 나은 절약",
    zh: "智能购物，更好的节省",
  },
  "hero.subtitle": {
    en: "Discover thousands of quality products at the best prices. Fast delivery, easy returns.",
    vi: "Khám phá hàng nghìn sản phẩm chất lượng với giá tốt nhất. Giao hàng nhanh, đổi trả dễ dàng.",
    es: "Descubre miles de productos de calidad a los mejores precios. Entrega rápida, devoluciones fáciles.",
    fr: "Découvrez des milliers de produits de qualité aux meilleurs prix. Livraison rapide, retours faciles.",
    de: "Entdecken Sie Tausende von Qualitätsprodukten zu den besten Preisen. Schnelle Lieferung, einfache Rückgabe.",
    ja: "最高の価格で何千もの高品質製品を発見してください。迅速な配送、簡単な返品。",
    ko: "최고의 가격으로 수천 개의 고품질 제품을 발견하세요. 빠른 배송, 쉬운 반품.",
    zh: "以最优价格发现数千种优质产品。快速送货，轻松退货。",
  },
  "hero.shopNow": {
    en: "Shop Now",
    vi: "Mua sắm ngay",
    es: "Comprar ahora",
    fr: "Acheter maintenant",
    de: "Jetzt einkaufen",
    ja: "今すぐ購入",
    ko: "지금 쇼핑",
    zh: "立即购物",
  },
  "hero.viewCategories": {
    en: "View Categories",
    vi: "Xem danh mục",
    es: "Ver categorías",
    fr: "Voir les catégories",
    de: "Kategorien anzeigen",
    ja: "カテゴリーを見る",
    ko: "카테고리 보기",
    zh: "查看分类",
  },

  // Features
  "features.shipping": {
    en: "Free Shipping",
    vi: "Miễn phí vận chuyển",
    es: "Envío gratuito",
    fr: "Livraison gratuite",
    de: "Kostenloser Versand",
    ja: "送料無料",
    ko: "무료 배송",
    zh: "免费送货",
  },
  "features.warranty": {
    en: "Quality Warranty",
    vi: "Bảo hành chất lượng",
    es: "Garantía de calidad",
    fr: "Garantie qualité",
    de: "Qualitätsgarantie",
    ja: "品質保証",
    ko: "품질 보증",
    zh: "质量保证",
  },
  "features.returns": {
    en: "Easy Returns",
    vi: "Đổi trả dễ dàng",
    es: "Devoluciones fáciles",
    fr: "Retours faciles",
    de: "Einfache Rückgabe",
    ja: "簡単返品",
    ko: "쉬운 반품",
    zh: "轻松退货",
  },
  "features.support": {
    en: "24/7 Support",
    vi: "Hỗ trợ 24/7",
    es: "Soporte 24/7",
    fr: "Support 24/7",
    de: "24/7 Support",
    ja: "24/7サポート",
    ko: "24/7 지원",
    zh: "24/7 支持",
  },
};

interface I18nContextType {
  locale: string;
  t: (key: string) => string;
  changeLanguage: (locale: string) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const t = (key: string): string => {
    return (
      translations[key]?.[initialLocale] || translations[key]?.["vi"] || key
    );
  };

  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale; // Replace the language segment
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <I18nContext.Provider value={{ locale: initialLocale, t, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}

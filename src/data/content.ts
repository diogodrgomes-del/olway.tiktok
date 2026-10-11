/**
 * CONTEÚDO DO MANUAL OLWAY TIKTOK SHOP
 * Todos os textos editáveis da página ficam aqui, separados dos componentes visuais.
 */

/** Destino do CTA "ACESSAR TIKTOK SHOP". Troque pelo link oficial desejado. */
export const TIKTOK_SHOP_URL = "https://affiliate.tiktok.com/";

/** Tela de abertura: 6 segundos no total, em duas cenas (Olway → TikTok). */
export const splash = {
  durationMs: 6000,
  stageMs: 3000,
  lines: ["Excelência em cada fio,", "propósito em cada estampa"],
  tiktokLines: ["Manual OLWAY", "TikTok Shop"],
};

export const sections = [
  { id: "inicio", label: "Início", short: "00" },
  { id: "time", label: "O Time", short: "01" },
  { id: "dna", label: "DNA Olway", short: "02" },
  { id: "pilares", label: "Estratégia", short: "03" },
  { id: "produtos", label: "Top 5", short: "04" },
  { id: "ideias", label: "Ideias", short: "05" },
  { id: "referencias", label: "Referências", short: "06" },
  { id: "checklist", label: "Checklist", short: "07" },
  { id: "executar", label: "Executar", short: "08" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const hero = {
  headline: ["MANUAL", "OLWAY", "TIKTOK SHOP"],
  text: "Bem-vindo ao universo de criadores Olway. Aprenda a transformar sua rotina fitness em conteúdo de valor, conectar sua audiência aos nossos produtos e gerar comissões através do TikTok Shop.",
  primaryCta: "Começar treinamento",
  secondaryCta: "Ver referências",
  imageAlt: "Embalagens pretas da Olway com o símbolo do pilar e a frase Excelência em cada fio, propósito em cada estampa",
};

export const welcome = {
  title: "VOCÊ AGORA FAZ PARTE DO TIME.",
  paragraphs: [
    "Este é o seu guia para criar conteúdos que representam a Olway, conectar produtos à sua rotina e desenvolver uma estratégia consistente de vendas no TikTok Shop.",
    "Aqui você vai entender o posicionamento da marca, os formatos recomendados, como utilizar a vitrine e quais referências seguir para criar seus próprios vídeos.",
  ],
  quickTitle: "Seu treinamento em 4 passos",
  quick: [
    { n: "1", title: "Entenda o DNA", text: "Valor acima de preço.", target: "dna" },
    { n: "2", title: "Aplique a estratégia", text: "Constância, naturalidade e link.", target: "pilares" },
    { n: "3", title: "Grave", text: "Use as ideias e as referências.", target: "ideias" },
    { n: "4", title: "Confira e publique", text: "Checklist antes de postar.", target: "checklist" },
  ],
  cards: [
    {
      icon: "crown",
      title: "Posicionamento",
      text: "Entenda como comunicar o valor premium da Olway.",
      target: "dna",
    },
    {
      icon: "video",
      title: "Conteúdo",
      text: "Aprenda a demonstrar as peças de maneira natural.",
      target: "ideias",
    },
    {
      icon: "bag",
      title: "Conversão",
      text: "Descubra como facilitar a compra pelo TikTok Shop.",
      target: "pilares",
    },
  ],
} as const;

export const dna = {
  title: "NÃO VENDEMOS APENAS ROUPAS. ENTREGAMOS PERFORMANCE.",
  text: "A Olway não disputa atenção com apelos desesperados de preço baixo. Nosso posicionamento é construído sobre qualidade, estética, modelagem e performance.",
  differentials: [
    { n: "01", title: "Caimento", text: "Modelagens que valorizam o físico." },
    { n: "02", title: "Performance", text: "Peças pensadas para acompanhar uma rotina de treino." },
    { n: "03", title: "Acabamento", text: "Atenção aos detalhes e à qualidade percebida." },
    { n: "04", title: "Estilo", text: "Estética fitness e bodybuilding." },
  ],
  avoid: [
    "“Corre comprar porque está baratinho!”",
    "“O mais barato que você vai encontrar!”",
    "Vídeos com tom de liquidação desesperada.",
    "Focar apenas em centavos e descontos.",
  ],
  prefer: [
    "“Olha como essa regata valoriza o shape.”",
    "“Repara no caimento dessa peça durante o treino.”",
    "“Esse é o tipo de acabamento que faz diferença.”",
    "Demonstrar qualidade, modelagem e experiência real.",
  ],
  quote: ["PREÇO PODE CHAMAR ATENÇÃO.", "VALOR É O QUE CONSTRÓI A MARCA."],
  promo: {
    title: "TRATANDO DE PROMOÇÕES",
    text: "Promoções eventuais existem e podem ser comunicadas, mas sempre de forma elegante, limpa e direta.",
    traits: ["Elegante", "Limpa", "Direta"],
    left: { label: "A promoção", text: "É uma facilidade do momento." },
    right: { label: "O que vende", text: "É a qualidade superior da peça." },
  },
};

export const pillars = {
  kicker: "Estratégia & execução",
  title: "COMO REALMENTE DAR CERTO NO TIKTOK SHOP.",
  intro:
    "O algoritmo do TikTok Shop premia a constância, a naturalidade e a facilidade de compra. Para vender de forma consistente e gerar comissões, você precisa dominar três pilares fundamentais:",
  rewards: ["Constância", "Naturalidade", "Facilidade de compra"],
  items: [
    {
      n: "A",
      icon: "rocket",
      title: "Constância e volume inteligente",
      lead: "Não dependa de um único vídeo viral. Construa presença com publicações regulares.",
      points: [
        {
          title: "Frequência é a chave",
          text: "O segredo do sucesso na plataforma não é apenas um vídeo viral isolado, mas sim a constância. Crie o hábito de postar conteúdos regularmente.",
          list: [] as string[],
        },
        {
          title: "Múltiplos pontos de contato",
          text: "Quanto mais vídeos você tiver no ar demonstrando as peças em diferentes situações, maior será a sua autoridade e o fluxo contínuo de vendas geradas pela sua vitrine.",
          list: [] as string[],
        },
      ],
      listTitle: "Na prática",
      list: [
        "Grave diferentes looks usando a mesma peça.",
        "Mostre o produto em diferentes momentos da rotina.",
        "Teste ganchos, enquadramentos e abordagens.",
        "Crie uma rotina sustentável de postagens.",
      ],
      dual: null as null | { direct: string; indirect: string },
      tip: null as string | null,
    },
    {
      n: "B",
      icon: "clapper",
      title: "Formatos e venda indireta (contexto orgânico)",
      lead: "O conteúdo deve parecer parte da sua rotina, não uma propaganda forçada.",
      points: [
        {
          title: "Fuja da propaganda tradicional",
          text: "Vídeos que soam corporativos ou excessivamente comerciais morrem no alcance. Os conteúdos que mais convertem são aqueles inseridos organicamente na sua rotina:",
          list: [
            "Fit checks rápidos antes de ir treinar.",
            "A preparação do pré-treino ou a montagem da bolsa de academia.",
            "Reviews sinceros destacando a liberdade de movimento, a absorção de suor e como a regata ou a compressão modelam o corpo.",
          ],
        },
      ],
      listTitle: "Abordagem dupla — alterne entre os dois",
      list: [] as string[],
      dual: {
        direct: "Vídeos que falam diretamente sobre as qualidades técnicas do produto.",
        indirect: "Vídeos onde o produto aparece de forma indireta, integrado ao seu estilo de vida fitness e streetwear.",
      },
      tip: null as string | null,
    },
    {
      n: "C",
      icon: "bag",
      title: "Link do produto no TikTok Shop",
      lead: "Toda publicação elegível com produtos Olway deve conter o produto correspondente vinculado pela ferramenta nativa do TikTok Shop.",
      points: [] as { title: string; text: string; list: string[] }[],
      listTitle: "Jornada de compra",
      list: [] as string[],
      dual: null as null | { direct: string; indirect: string },
      tip: "As comissões seguem as regras de atribuição, elegibilidade, aprovação e pagamento da própria plataforma. Não há valor garantido nem saldo disponível para saque de forma instantânea.",
    },
  ],
  flow: [
    { icon: "play", label: "Assiste ao vídeo" },
    { icon: "eye", label: "Descobre o produto" },
    { icon: "bag", label: "Clica na sacolinha" },
    { icon: "cart", label: "Compra pelo TikTok Shop" },
    { icon: "badge", label: "Comissão atribuída" },
  ],
};

export const ideas = {
  title: "NÃO SABE O QUE GRAVAR? COMECE POR AQUI.",
  items: [
    {
      n: "01",
      title: "Fit Check",
      hook: "Olha o caimento dessa regata antes do treino.",
      execution: "Mostrar a peça de frente, de lado e em movimento, valorizando o shape e a modelagem.",
    },
    {
      n: "02",
      title: "Review Sincero",
      hook: "Uma das coisas que eu mais observo em roupa de treino é o caimento.",
      execution: "Mostrar detalhes reais da peça, tecido, acabamento e experiência de uso.",
    },
    {
      n: "03",
      title: "Rotina Fitness",
      hook: "Preparando tudo para mais um treino.",
      execution: "Integrar naturalmente uma peça Olway à preparação para a academia.",
    },
    {
      n: "04",
      title: "Detalhes do Produto",
      hook: "Repara nesses detalhes dessa peça.",
      execution: "Usar closes do acabamento, costura e modelagem, destacando características verificáveis.",
    },
    {
      n: "05",
      title: "Look Completo",
      hook: "Esse é o tipo de combinação que eu curto usar para treinar.",
      execution: "Apresentar a composição visual do look e como a peça veste.",
    },
    {
      n: "06",
      title: "Conteúdo Orgânico",
      hook: "Mais um dia de treino por aqui.",
      execution: "Gravar cenas naturais da academia com a peça em uso e o link do produto vinculado.",
    },
  ],
};

export const checklist = {
  title: "ANTES DE PUBLICAR, CONFIRA.",
  storageKey: "olway-creator-hub:checklist:v1",
  items: [
    "Meu vídeo valoriza a qualidade, a modelagem e a experiência com a peça.",
    "O produto aparece de forma natural e está bem apresentado.",
    "Evitei exageros, promessas irreais e apelos desesperados de preço.",
    "Vinculei o produto correto na sacolinha do TikTok Shop.",
    "O vídeo é original e segue as regras da plataforma.",
    "Estou mantendo minha estratégia de consistência.",
  ],
  done: "CHECKLIST CONCLUÍDO. PRONTO PARA PUBLICAR!",
  doneNote: "A publicação é feita por você, diretamente no TikTok. Este checklist apenas confirma que o vídeo está alinhado ao padrão Olway.",
};

export const finalCta = {
  headline: "AGORA É HORA DE EXECUTAR!",
};

export const social = {
  instagram: "https://www.instagram.com/olway.clothing?utm_source=ig_web_button_share_sheet&mdxt=ZDNlZDc0MzIxNw==",
  tiktok: "https://www.tiktok.com/@olway.clothing",
  handle: "@olway.clothing",
};

export const footer = {
  brand: "OLWAY — MANUAL TIKTOK SHOP",
  tagline: "Performance, estética e autenticidade em cada conteúdo.",
};

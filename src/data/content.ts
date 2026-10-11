/**
 * CONTEÚDO DO MANUAL OLWAY CREATOR HUB
 * Todos os textos editáveis da página ficam aqui, separados dos componentes visuais.
 */

/** Destino do CTA "ACESSAR TIKTOK SHOP". Troque pelo link oficial desejado. */
export const TIKTOK_SHOP_URL = "https://affiliate.tiktok.com/";

export const sections = [
  { id: "inicio", label: "Início", short: "00" },
  { id: "time", label: "O Time", short: "01" },
  { id: "dna", label: "DNA Olway", short: "02" },
  { id: "pilares", label: "3 Pilares", short: "03" },
  { id: "ideias", label: "Ideias", short: "04" },
  { id: "referencias", label: "Referências", short: "05" },
  { id: "checklist", label: "Checklist", short: "06" },
  { id: "executar", label: "Executar", short: "07" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const hero = {
  tag: "Creator Hub",
  subtitle: "Manual Definitivo do Criador — TikTok Shop",
  headline: ["SEU CONTEÚDO.", "SEU SHAPE.", "SEUS RESULTADOS."],
  text: "Bem-vindo ao universo de criadores Olway. Aprenda a transformar sua rotina fitness em conteúdo de valor, conectar sua audiência aos nossos produtos e gerar comissões através do TikTok Shop.",
  primaryCta: "Começar treinamento",
  secondaryCta: "Ver referências",
  imageAlt: "Criador Olway na academia vestindo camiseta de compressão preta com o símbolo da marca no peito",
};

export const welcome = {
  title: "VOCÊ AGORA FAZ PARTE DO TIME.",
  paragraphs: [
    "Este é o seu guia para criar conteúdos que representam a Olway, conectar produtos à sua rotina e desenvolver uma estratégia consistente de vendas no TikTok Shop.",
    "Aqui você vai entender o posicionamento da marca, os formatos recomendados, como utilizar a vitrine e quais referências seguir para criar seus próprios vídeos.",
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
  note: "Promoções podem ser divulgadas — de forma elegante, sem comprometer a percepção premium do produto.",
};

export const pillars = {
  title: "3 PILARES PARA TRANSFORMAR CONTEÚDO EM VENDAS.",
  items: [
    {
      n: "01",
      title: "Constância e volume inteligente",
      lead: "Não dependa de um único vídeo viral. Construa presença e aumente os pontos de contato com a sua audiência por meio de publicações regulares.",
      listTitle: "Exemplos práticos",
      list: [
        "Grave diferentes looks usando a mesma peça.",
        "Mostre o produto em diferentes momentos da rotina.",
        "Teste ganchos, enquadramentos e abordagens.",
        "Crie uma rotina sustentável de postagens.",
      ],
      tip: null as string | null,
    },
    {
      n: "02",
      title: "Conteúdo natural e venda indireta",
      lead: "O conteúdo deve parecer parte da sua rotina, não uma propaganda forçada.",
      listTitle: "Formatos que funcionam",
      list: [
        "Fit check antes da academia.",
        "Preparação do pré-treino.",
        "Montagem da bolsa de treino.",
        "Review sincero da peça.",
        "Demonstração do caimento.",
        "Look fitness para diferentes ocasiões.",
        "Vídeos mostrando o produto em movimento.",
      ],
      tip: "Alterne vídeos focados diretamente no produto com vídeos em que a peça aparece de forma natural na sua rotina.",
    },
    {
      n: "03",
      title: "Link do produto no TikTok Shop",
      lead: "Toda publicação elegível com produtos Olway deve conter o produto correspondente vinculado pela ferramenta nativa do TikTok Shop.",
      listTitle: "Jornada de compra",
      list: [] as string[],
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
  headline: ["VOCÊ TEM O SHAPE.", "VOCÊ TEM O CONTEÚDO.", "AGORA É HORA DE EXECUTAR."],
  text: "Transforme sua rotina em conteúdo autêntico. Valorize cada peça, mantenha a consistência e facilite a jornada de compra da sua audiência.",
  primary: "Acessar TikTok Shop",
  secondary: "Rever referências",
};

export const footer = {
  brand: "OLWAY — CREATOR HUB",
  tagline: "Performance, estética e autenticidade em cada conteúdo.",
};

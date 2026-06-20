/* ══════════════════════════════════════════════════
   BRECHÓ ECO-HERANÇA — DATA
   js/data.js
══════════════════════════════════════════════════ */

const imgs = {
  f1:'https://res.cloudinary.com/dhbzgqy3m/image/upload/f_auto,q_auto/produto1_raodkr',
  f2:'https://res.cloudinary.com/dhbzgqy3m/image/upload/f_auto,q_auto/produto2_pytzia',
  f3:'https://res.cloudinary.com/dhbzgqy3m/image/upload/f_auto,q_auto/produto3_vq8aiy',
  f4:'https://res.cloudinary.com/dhbzgqy3m/image/upload/f_auto,q_auto/produto4_fjrc0z',
  f5:'https://res.cloudinary.com/dhbzgqy3m/image/upload/f_auto,q_auto/produto5conjunto_g1yohe',
  f6:'https://res.cloudinary.com/dhbzgqy3m/image/upload/f_auto,q_auto/produto6_disyal',
  f7:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop',
  f8:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
  m1:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
  m2:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop',
  m3:'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
  m4:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
  m5:'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=800&fit=crop',
  m6:'https://res.cloudinary.com/dhbzgqy3m/image/upload/f_auto,q_auto/Moletom_Azul_pniofa',
  a1:'https://res.cloudinary.com/dhbzgqy3m/image/upload/f_auto,q_auto/acessorio1_cmrzaq',
  a2:'https://res.cloudinary.com/dhbzgqy3m/image/upload/f_auto,q_auto/acessorio2_uny9i5',
  a3:'https://res.cloudinary.com/dhbzgqy3m/image/upload/f_auto,q_auto/acessorio3_jw6znl',
  a4:'https://res.cloudinary.com/dhbzgqy3m/image/upload/f_auto,q_auto/acessorio4_bnyut6',
  a5:'https://res.cloudinary.com/dhbzgqy3m/image/upload/f_auto,q_auto/acessorio5_snj40t',
  a6:'https://res.cloudinary.com/dhbzgqy3m/image/upload/f_auto,q_auto/acessorio6_ljdgkl',
  g1:'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=75&fit=crop',
  g2:'https://images.unsplash.com/photo-1483985988355-763728e1802e?w=600&q=75&fit=crop',
  g3:'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=75&fit=crop',
  g4:'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=75&fit=crop',
  g5:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=75&fit=crop',
  g6:'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=75&fit=crop',
  g7:'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=75&fit=crop',
  g8:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=75&fit=crop'
};

const produtos = [
  {id:1,nome:'Blusa Paisley Caramelo',cat:'feminino',catTag:'Feminino · Vintage',desc:'Blusa manga longa em estampa paisley tons caramelo e marrom. Tecido macio com toque retrô. Peça versátil que combina com calças claras ou saias midi.',img:imgs.f1,badge:'destaque',bdTxt:'Destaque',nov:true},
  {id:2,nome:'Jardineira Jeans Anos 90',cat:'feminino',catTag:'Feminino · Anos 90',desc:'Jardineira jeans clássica anos 90 com ajuste na cintura e bolsos laterais. Uma das peças mais icônicas do brechó — estilo e nostalgia em cada costura.',img:imgs.f2,badge:'new',bdTxt:'Novo',nov:true},
  {id:3,nome:'Conjunto Casual Vintage',cat:'feminino',catTag:'Feminino · Conjunto',desc:'Moletom vintage com estampa gráfica + calça xadrez vermelha. Look anos 90 completo e autêntico, cheio de personalidade e história.',img:imgs.f3,badge:null,bdTxt:'',nov:false},
  {id:4,nome:'Saia Jeans com Tule Bordado',cat:'feminino',catTag:'Feminino · Peça Única',desc:'Saia jeans exclusiva com camadas de tule e bordados florais de margaridas. Acompanha bolsa e chapéu jeans combinando. Peça única de colecionador.',img:imgs.f4,badge:'luxo',bdTxt:'Premium',nov:false},
  {id:5,nome:'Conjunto Saia Midi Veludo + T-shirt',cat:'feminino',catTag:'Feminino · Conjunto',desc:'Conjunto com saia midi rodada em veludo cotelê chocolate e t-shirt estampada com flores e frases inspiradoras. Estilo boho vintage moderno e feminino.',img:imgs.f5,badge:'destaque',bdTxt:'Destaque',nov:true},
  {id:6,nome:'Conjunto Blusa Laço + Saia Caramelo',cat:'feminino',catTag:'Feminino · Conjunto',desc:'Conjunto elegante com blusa branca manga bufante e laço no decote, mais saia caramelo com botões frontais. Look romântico, atemporal e muito delicado.',img:imgs.f6,badge:'new',bdTxt:'Novo',nov:true},
  {id:7,nome:'Casaco Trench Vintage',cat:'feminino',catTag:'Feminino · Inverno',desc:'Casaco estilo trench em tecido encorpado. Caimento impecável, cinto e botões originais. Clássico intemporal que aquece com elegância.',img:imgs.f7,badge:'luxo',bdTxt:'Premium',nov:false},
  {id:8,nome:'Macacão Estampado Anos 70',cat:'feminino',catTag:'Feminino · Vintage',desc:'Macacão de lapela larga com estampa geométrica colorida. Corte anos 70 autêntico, botões originais. Uma peça de colecionador com muito charme.',img:imgs.f8,badge:'new',bdTxt:'Novo',nov:true},
  {id:9,nome:'Camisa Oxford Vintage',cat:'masculino',catTag:'Masculino · Clássico',desc:'Camisa oxford em algodão 100% natural. Listras azul e branco discretas. Clássico do guarda-roupa masculino intemporal.',img:imgs.m1,badge:null,bdTxt:'',nov:false},
  {id:10,nome:'Calça Chino Clássica',cat:'masculino',catTag:'Masculino · Clássico',desc:'Calça chino de algodão encorpado em bege natural. Corte reto, cinto original incluso. Versatilidade pura.',img:imgs.m2,badge:'new',bdTxt:'Novo',nov:true},
  {id:11,nome:'Jaqueta Bomber Retrô',cat:'masculino',catTag:'Masculino · Vintage',desc:'Jaqueta bomber com bordado vintage no peito. Interior acolchoado original. Uma peça rara com muita história.',img:imgs.m3,badge:'destaque',bdTxt:'Destaque',nov:true},
  {id:12,nome:'Blazer Tweed Inglês',cat:'masculino',catTag:'Masculino · Premium',desc:'Blazer de tweed com elbow patches originais. Corte inglês clássico, peso ideal. Sofisticação editorial intemporal.',img:imgs.m4,badge:'luxo',bdTxt:'Premium',nov:false},
  {id:13,nome:'Camisa Flanela Anos 80',cat:'masculino',catTag:'Masculino · Vintage',desc:'Camisa de flanela em xadrez verde e preto. Autêntica dos anos 80, tecido macio ao toque. Grunge com história.',img:imgs.m5,badge:null,bdTxt:'',nov:false},
  {id:14,nome:'Moletom Azul Vintage',cat:'masculino',catTag:'Masculino · Casual',desc:'Moletom college vintage em azul. Algodão pesado, interior felpudo, bordado frontal. Conforto com identidade e personalidade.',img:imgs.m6,badge:null,bdTxt:'',nov:false},
  {id:15,nome:'Ecobag Bordada Tulipas',cat:'acessorio',catTag:'Acessório · Ecobag',desc:'Ecobag de lona natural com bordado artesanal de tulipas rosas. Charm de contas coloridas na alça. Peça exclusiva feita à mão — cada uma é única.',img:imgs.a1,badge:'destaque',bdTxt:'Destaque',nov:true},
  {id:16,nome:'Ecobag Corações de Crochê',cat:'acessorio',catTag:'Acessório · Ecobag',desc:'Ecobag de lona com aplicações de corações em crochê rosa e pérolas. Acompanha mini bolsa em crochê. Trabalho artesanal delicado e encantador.',img:imgs.a2,badge:null,bdTxt:'',nov:false},
  {id:17,nome:'Mini Bag Coração de Botões',cat:'acessorio',catTag:'Acessório · Bolsa',desc:'Mini ecobag de lona com coração formado por botões rosa e lilás em diferentes tamanhos. Tamanho perfeito para o dia a dia. Peça artesanal com muito carinho.',img:imgs.a3,badge:'new',bdTxt:'Novo',nov:false},
  {id:18,nome:'Ecobag Bordada Cerejas',cat:'acessorio',catTag:'Acessório · Ecobag',desc:'Ecobag de lona em azul claro com bordado artesanal de cerejas vermelhas e folhinhas verdes. Delicada e charmosa, perfeita para compras e passeios.',img:imgs.a4,badge:null,bdTxt:'',nov:true},
  {id:19,nome:'Ecobag Patchwork Vintage',cat:'acessorio',catTag:'Acessório · Ecobag',desc:'Ecobag artesanal em patchwork com retalhos de tecidos vintage — xadrez, florais e listras em tons terrosos. Cada peça é única e totalmente sustentável.',img:imgs.a5,badge:'luxo',bdTxt:'Premium',nov:false},
  {id:20,nome:'Ecobag Patchwork Colorida',cat:'acessorio',catTag:'Acessório · Ecobag',desc:'Ecobag patchwork com retalhos de estampas variadas e alegres — pássaros, flores, cogumelos e muito mais. Uma explosão de cor, criatividade e sustentabilidade.',img:imgs.a6,badge:null,bdTxt:'',nov:false}
];

const faqData = [
  {q:'Vocês vendem online ou fazem entrega?',a:'Não! O Eco-Herança é um brechó presencial. Acreditamos que a experiência de tocar, experimentar e descobrir a peça certa só acontece de verdade quando você nos visita. Venha até nossa loja no Jardim Esmeralda, SP.'},
  {q:'Como posso saber quais peças estão disponíveis?',a:'Nosso catálogo aqui no site mostra uma seleção das peças disponíveis, mas nosso acervo está sempre mudando. Para novidades em primeira mão, siga nosso Instagram @ecoherenca ou mande uma mensagem no WhatsApp.'},
  {q:'Posso reservar uma peça pelo WhatsApp?',a:'Sim! Entre em contato pelo (11) 96503-0076 e poderemos reservar a peça por até 24h para você vir experimentar. Mas lembre: a venda é sempre presencial.'},
  {q:'Vocês aceitam consignação ou doação de peças?',a:'Sim, trabalhamos com consignação e também aceitamos doações de peças em bom estado. Entre em contato pelo WhatsApp para saber mais sobre como funciona nosso processo de curadoria.'},
  {q:'Quais formas de pagamento vocês aceitam?',a:'Aceitamos dinheiro, PIX, débito e crédito (até 3x sem juros). Para peças acima de R$200, pode parcelar em até 6x com taxa.'},
  {q:'Qual o horário de funcionamento?',a:'Funcionamos de terça a sábado das 10h às 19h, e aos domingos das 11h às 17h. Às segundas-feiras estamos fechados para organização do acervo.'},
  {q:'O que significa "curadoria" das peças?',a:'Cada peça que entra no Eco-Herança passa por uma análise criteriosa de qualidade, estado de conservação, valor estético e histórico. Não vendemos qualquer coisa — selecionamos apenas o que merece ser chamado de herança.'}
];

const galleryImgs = [imgs.g1,imgs.g2,imgs.g3,imgs.g4,imgs.g5,imgs.g6,imgs.g7,imgs.g8,imgs.f1,imgs.f3,imgs.m3,imgs.a1];
const igImgs    = [imgs.f2,imgs.f5,imgs.f7,imgs.m4,imgs.a5,imgs.g2,imgs.g5,imgs.f1,imgs.m1,imgs.a4];

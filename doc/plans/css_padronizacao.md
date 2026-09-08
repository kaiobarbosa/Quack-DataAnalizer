# Guia Geral de CSS — `index.css`

Este documento resume as principais regras visuais e padrões definidos no arquivo `index.css`. A ideia é servir como uma referência rápida para manter novas páginas e componentes consistentes com o estilo existente.

## 1. Identidade visual

O projeto utiliza uma identidade visual **escura**, com superfícies em azul-marinho e destaque em **azul-ciano**. Os elementos principais combinam fundos escuros, bordas discretas, transparências, gradientes e efeitos de desfoque.

### 1.1 Cores principais

As cores ficam centralizadas em variáveis CSS dentro de `:root`.

| Variável | Cor | Uso geral |
|---|---|---|
| `--bg-900` | `#0a1220` | Fundo mais escuro |
| `--bg-800` | `#0f1a2c` | Fundo secundário |
| `--surface-700` | `#152238` | Superfícies escuras |
| `--surface-600` | `#1a2a3e` | Superfícies intermediárias |
| `--surface-500` | `#20314b` | Superfícies mais claras |
| `--accent-400` | `#7dd3fc` | Destaque principal, links e elementos ativos |
| `--accent-500` | `#38bdf8` | Destaque secundário |
| `--accent-600` | `#0ea5e9` | Azul de maior intensidade e sombras de destaque |
| `--highlight` | `rgba(125, 211, 252, 0.16)` | Realces com transparência |
| `--border-soft` | `rgba(148, 163, 184, 0.22)` | Bordas suaves |
| `--text-100` | `#e2e8f0` | Texto principal |
| `--text-200` | `#cbd5e1` | Texto secundário |
| `--text-300` | `#94a3b8` | Texto auxiliar, placeholders e estados inativos |
| `--danger` | `#f87171` | Cor destinada a erros/perigo |
| `--success` | `#4ade80` | Cor destinada a sucesso |
| `--shadow` | `rgba(15, 23, 42, 0.45)` | Cor base para sombras |

> Nem todas as variáveis declaradas no `:root` são utilizadas diretamente nos trechos de componentes existentes, mas elas fazem parte da paleta definida pelo arquivo.

## 2. Fundo da página

`html` e `body` utilizam um fundo composto por três camadas:

- um **radial-gradient** no canto superior esquerdo;
- outro **radial-gradient** no canto inferior direito;
- um **linear-gradient** diagonal como base.

O resultado é um fundo escuro com pequenas áreas luminosas azuladas, criando profundidade sem deixar a interface excessivamente chamativa.

A cor padrão do texto da página é `var(--text-100)`.

```css
background:
  radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 38%),
  radial-gradient(circle at bottom right, rgba(157, 197, 255, 0.14), transparent 32%),
  linear-gradient(135deg, var(--bg-900), var(--bg-800) 40%, #111d2d 100%);
```

## 3. Reset e regras básicas

O arquivo aplica uma regra global de `box-sizing`:

```css
* {
  box-sizing: border-box;
}
```

Isso faz com que `padding` e `border` sejam considerados dentro da largura e altura declaradas dos elementos.

O `body` começa sem margem padrão do navegador:

```css
body {
  margin: 0;
}
```

Além disso, a página recebe altura mínima de `100vh`, fica centralizada por Flexbox e possui espaçamento lateral e vertical padrão.

```css
display: flex;
align-items: center;
justify-content: center;
padding: 24px 20px;
```

O eixo horizontal não permite overflow e o eixo vertical pode rolar quando o conteúdo ultrapassa a altura disponível.

## 4. Tipografia

A fonte principal segue esta ordem de preferência:

```css
font-family: "Segoe UI", "Inter", sans-serif;
```

Portanto, a interface prioriza `Segoe UI`, depois `Inter`, e utiliza uma fonte genérica sem serifa como fallback.

Para `button`, `input` e `select`, a fonte do elemento é herdada da página:

```css
button,
input,
select {
  font: inherit;
}
```

## 5. Largura e estrutura principal

A área principal `.page-shell` é limitada a **470px**:

```css
.page-shell {
  width: min(100%, 470px);
}
```

Isso faz com que o conteúdo tenha uma largura confortável em telas grandes, mas continue responsivo em telas menores.

## 6. Card principal

O `.auth-card` é o elemento visual central da página. Ele utiliza um estilo de **glassmorphism** moderado:

- fundo escuro com gradiente vertical;
- borda fina e semitransparente;
- cantos arredondados de `24px`;
- sombra externa forte;
- brilho interno discreto;
- `backdrop-filter: blur(18px)`;
- padding interno de `18px 18px 14px`.

O card também possui uma altura máxima relativa à viewport e rolagem vertical própria quando necessário.

```css
border-radius: 24px;
backdrop-filter: blur(18px);
```

### 6.1 Brilho decorativo do card

O pseudo-elemento `.auth-card::before` cria uma camada decorativa sobre o card usando outro gradiente.

Esse recurso gera um brilho azul muito sutil nas bordas e nas áreas diagonais do componente.

O pseudo-elemento possui `pointer-events: none`, portanto não interfere com cliques ou interações.

## 7. Cabeçalho e marca

A `.brand-row` usa Flexbox para alinhar o ícone e o texto da marca:

```css
display: flex;
align-items: center;
gap: 12px;
```

### 7.1 Ícone da marca

O `.brand-mark` possui:

- `46px × 46px`;
- cantos arredondados de `14px`;
- fundo com gradiente azul transparente;
- borda azul suave;
- cor `var(--accent-400)`;
- fonte destacada;
- brilho interno discreto.

### 7.2 Texto da marca

O pequeno texto `.brand-kicker` utiliza:

- `var(--accent-400)`;
- tamanho `0.72rem`;
- letras espaçadas (`letter-spacing: 0.18em`);
- transformação para maiúsculas.

O nome principal da marca utiliza tamanho `1.2rem` e pequeno espaçamento entre letras.

## 8. Botões de abas e alternância

Os componentes `.tab-switch` e `.type-toggle` funcionam como áreas de seleção. Ambos usam:

- CSS Grid com duas colunas;
- pequenos espaçamentos entre os botões;
- fundo escuro/transparente;
- bordas suaves;
- cantos arredondados.

Os botões possuem uma transição geral de `0.2s ease`.

### 8.1 Estado padrão

Botões de aba e tipo, quando inativos, possuem fundo transparente e texto em `var(--text-300)`.

### 8.2 Estado ativo

O estado `.active` utiliza gradiente azul transparente, texto mais claro e uma borda interna suave.

Exemplo do conceito:

```css
background: linear-gradient(
  135deg,
  rgba(125, 211, 252, 0.22),
  rgba(56, 189, 248, 0.12)
);
color: var(--text-100);
```

### 8.3 Hover

Ao passar o mouse sobre `.tab-button` ou `.type-button`, o arquivo aplica:

```css
filter: brightness(1.08);
```

Ou seja, o elemento fica levemente mais luminoso.

## 9. Formulários

`.auth-form` utiliza Flexbox em coluna, com espaçamento entre os campos:

```css
display: flex;
flex-direction: column;
gap: 8px;
```

Os grupos `.field` e `.password-field` também são organizados verticalmente e usam um pequeno espaçamento entre label e campo.

## 10. Labels

Os `label` utilizam:

- `var(--text-200)`;
- tamanho `0.75rem`;
- peso `600`.

Isso cria uma hierarquia visual em que o label é secundário em relação ao conteúdo digitado.

## 11. Inputs e selects

Campos `input` e `select` compartilham o mesmo padrão visual:

- largura de `100%`;
- borda fina semitransparente;
- fundo escuro;
- texto em `var(--text-100)`;
- altura mínima de `38px`;
- padding horizontal de `12px`;
- `border-radius: 10px`;
- sem outline padrão;
- transições suaves.

### 11.1 Placeholder

Placeholders e o texto padrão do `select` utilizam `var(--text-300)`, proporcionando menor contraste que o texto principal.

### 11.2 Hover

No `hover`, a borda recebe um leve destaque azul:

```css
border-color: rgba(125, 211, 252, 0.2);
```

### 11.3 Focus

No foco, a interface aumenta claramente o destaque do campo:

```css
border-color: rgba(125, 211, 252, 0.6);
box-shadow: 0 0 0 4px rgba(125, 211, 252, 0.12);
```

O padrão visual é: **borda azul + halo azul transparente**.

## 12. Select personalizado

O `select` remove a aparência padrão do navegador:

```css
appearance: none;
```

Depois, uma seta é recriada com dois `linear-gradient`, posicionados no lado direito do campo.

Isso mantém a aparência do select consistente com o restante da interface.

## 13. Campo de senha e botão de visibilidade

O `.input-shell` utiliza `position: relative` para permitir posicionar o botão de senha dentro do campo.

O `.password-toggle` é colocado no lado direito, centralizado verticalmente.

### Estado padrão

- fundo transparente;
- texto em `var(--text-300)`;
- tamanho aproximado de `1rem`.

### Hover

Ao passar o mouse:

```css
background: rgba(148, 163, 184, 0.08);
color: var(--text-100);
```

## 14. Links e textos auxiliares

Links, textos de alternância e botões de link inicialmente utilizam `var(--text-300)`.

O `.link-button` recebe maior destaque com:

```css
color: var(--accent-400);
font-weight: 700;
background: transparent;
border: 0;
```

Isso mantém ações secundárias visíveis sem competir diretamente com o botão principal.

## 15. Botão principal

O `.primary-button` é o elemento de ação mais destacado da interface.

### Aparência

- altura mínima de `42px`;
- sem borda;
- `border-radius: 10px`;
- gradiente azul forte;
- texto escuro `#04131d`;
- peso `800`;
- leve espaçamento entre letras;
- sombra azul externa;
- brilho interno.

```css
background: linear-gradient(135deg, #67d4ff, #1aa7eb);
color: #04131d;
font-weight: 800;
```

### Hover

O botão sobe `1px`, aumenta levemente a sombra e recebe um pequeno aumento de brilho:

```css
transform: translateY(-1px);
filter: brightness(1.04);
```

A transição é feita em `0.2s ease`.

### Loading

Quando `.primary-button` recebe `.is-loading`, sua opacidade diminui para `0.9`.

## 16. Classes utilitárias

A classe `.hidden` remove completamente o elemento do fluxo visual:

```css
.hidden {
  display: none !important;
}
```

## 17. Responsividade por altura

O arquivo considera que uma janela pode ter pouca altura. Por isso, existem dois breakpoints baseados em `max-height`.

### Até 760px de altura

A interface reduz gradualmente:

- padding do card;
- espaçamentos entre elementos;
- gaps do formulário;
- altura mínima do botão principal.

O objetivo é preservar o conteúdo sem deixar o card ocupar espaço excessivo.

### Até 640px de altura

O layout é compactado ainda mais:

- card com padding menor;
- menor espaço entre a marca e outros controles;
- gaps menores nos formulários;
- botão principal reduzido para `38px` de altura mínima.

## 18. Responsividade por largura

### Até 520px

Em telas menores:

- o `body` reduz o padding para `16px 12px`;
- `.page-shell` passa a usar praticamente toda a largura disponível;
- o card diminui o padding e passa a `border-radius: 20px`;
- o ícone da marca diminui para `40px × 40px`;
- os controles de abas reduzem gap e padding;
- `.two-columns` deixa de ter duas colunas e passa para uma única coluna.

Essa mudança é especialmente importante para formulários em dispositivos móveis.

### Até 360px

A interface fica ainda mais compacta:

- o espaçamento entre letras do `brand-kicker` diminui;
- o nome da marca diminui para `1rem`;
- `input` e `select` passam a ter `36px` de altura mínima;
- campos recebem fonte de `0.92rem`;
- textos auxiliares e links passam para `0.78rem`.

## 19. Padrões visuais principais a manter

Ao criar novos componentes seguindo este `index.css`, os principais padrões a preservar são:

1. **Tema escuro:** usar fundos próximos de `#0a1220` a `#20314b`.
2. **Destaque ciano:** utilizar a família `#7dd3fc`, `#38bdf8` e `#0ea5e9` para ações e estados ativos.
3. **Texto hierárquico:** `--text-100` para conteúdo principal, `--text-200` para elementos secundários e `--text-300` para elementos auxiliares.
4. **Bordas discretas:** preferir bordas transparentes e pouco contrastantes.
5. **Cantos arredondados:** componentes principais usam valores relativamente altos, enquanto inputs e botões ficam próximos de `10px`.
6. **Gradientes:** o design utiliza gradientes em fundos, estados ativos, ícone da marca e botão principal.
7. **Transparência:** `rgba(...)` é utilizada para suavizar fundos, bordas, sombras e realces.
8. **Microinterações:** estados `hover` e `focus` devem usar transições de aproximadamente `0.2s ease`.
9. **Profundidade:** sombras externas, brilhos internos e `backdrop-filter: blur(18px)` são partes importantes do visual do card.
10. **Responsividade:** em telas estreitas, os componentes devem reduzir espaçamentos e, quando necessário, transformar estruturas de duas colunas em uma coluna.

## 20. Resumo rápido

**Fundo:** azul-marinho escuro com gradientes radiais azulados.

**Fonte:** `"Segoe UI", "Inter", sans-serif`.

**Texto principal:** `#e2e8f0`.

**Texto secundário:** `#cbd5e1`.

**Texto auxiliar:** `#94a3b8`.

**Cor de destaque:** `#7dd3fc` / `#38bdf8` / `#0ea5e9`.

**Botão principal:** gradiente azul, texto escuro, sombra azul e leve elevação no hover.

**Inputs:** fundo escuro, borda discreta, cantos de `10px`, foco com borda azul e halo.

**Card:** fundo escuro translúcido com gradiente, borda suave, sombra profunda, `24px` de arredondamento e blur.

**Efeitos principais:** gradientes, transparências, blur, sombras, brilho interno, transições de `0.2s`, estados `hover` e `focus`.

**Responsividade:** redução progressiva de paddings, gaps, tamanhos de fonte e conversão de duas colunas para uma coluna em telas pequenas.

# Atividade 7 - Three.js OBJ

Projeto de atividade da disciplina de Animação de Elementos de Interface com uma cena 3D em Three.js usando um modelo no formato OBJ/MTL.

## O que o projeto faz

- Renderiza uma moeda 3D com Three.js.
- Carrega o modelo a partir de arquivos OBJ e MTL.
- Aplica ajuste de posição, rotação e escala no objeto.
- Permite interação com mouse usando OrbitControls.
- Mostra uma curiosidade sobre moedas no painel lateral.

## Tecnologias

- Vite
- TypeScript
- Three.js
- OBJLoader e MTLLoader
- OrbitControls

## Como executar

Instale as dependências e rode o projeto:

```bash
npm install
npm run dev
```

Se quiser gerar a versão final para produção:

```bash
npm run build
```

## Controles

- Arraste com o mouse para girar a moeda.
- Use a roda do mouse para aproximar ou afastar a câmera.

## Estrutura principal

- `src/main.ts`: monta a interface e inicia a experiência 3D.
- `src/experience.ts`: configura cena, câmera, luzes, loaders e animação.
- `src/style.css`: estilo do layout e do visual escuro.
- `public/models/coin/coin.obj`: modelo 3D da moeda.
- `public/models/coin/coin.mtl`: materiais da moeda.

## Observação

O projeto foi pensado como uma entrega mínima viável para a atividade, com foco em atender o enunciado e manter a execução simples.

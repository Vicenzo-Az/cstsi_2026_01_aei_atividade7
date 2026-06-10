import { FinanceActivityExperience } from "./experience";
import "./style.css";

const app = document.getElementById("app");
if (!app) throw new Error("App root not found");

app.innerHTML = `
  <main class="page-shell">
    <section class="copy-panel">
      <p class="eyebrow">Curiosidade</p>
      <h1>Você sabia isso sobre moedas?</h1>
      <p class="lead">
        Moedas existem há milhares de anos e, além de servir como dinheiro, também contam
        a história dos povos que as criaram.
      </p>

      <div class="info-grid">
        <article>
          <span>Origem</span>
          <strong>As primeiras moedas metálicas padronizadas surgiram na Lídia, na Ásia Menor.</strong>
        </article>
        <article>
          <span>Período</span>
          <strong>Esse uso começou por volta do século VII a.C.</strong>
        </article>
        <article>
          <span>Curiosidade</span>
          <strong>Moedas antigas eram importantes para comércio, poder e até propaganda.</strong>
        </article>
      </div>

      <ul class="notes">
        <li>A moeda 3D foi criada dentro de <strong>public/models/coin</strong>.</li>
        <li>Arraste com o mouse para girar e use a roda para aproximar ou afastar.</li>
      </ul>

      <p id="status" class="status-text">Preparando a cena 3D...</p>
    </section>

    <section class="stage-shell">
      <div class="stage-frame">
        <div class="stage-label">Cena 3D</div>
        <div id="stage" class="stage"></div>
      </div>
    </section>
  </main>
`;

const stage = document.getElementById("stage") as HTMLElement;
const status = document.getElementById("status") as HTMLElement;

new FinanceActivityExperience(stage, status);

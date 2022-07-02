class Modal {
    static abraModalCarregamento() {
        if (window['modalCarregamento']) {
            window['modalCarregamento'].show();

            return;
        }

        window['modalCarregamento'] = new Modal().carregamento().render();
    }

    static fecheModalCarregamento() {
        if (window['modalCarregamento']) {
            setTimeout(() => window['modalCarregamento'].hide(), 500);
        }
    }

    erro(mensagem, detalhes) {
        return new ModalBuilder()
            .cabecalhoErro()
            .corpo(mensagem)
            .centralizado()
            .detalhes(detalhes)
            .adicioneAcaoVoltar()
            .alinhamentoCorpoCentralizado()
            .alinhamentoCabecalhoCentro()
            .erro();
    }
    sucesso(mensagem) {
        return new ModalBuilder()
            .cabecalhoSucesso()
            .corpo(mensagem)
            .centralizado()
            .adicioneAcaoVoltar()
            .alinhamentoCabecalhoCentro()
            .alinhamentoCorpoCentralizado()
            .sucesso();
    }
    atencao(mensagem, detalhes, acaoVoltar) {
        return new ModalBuilder()
            .cabecalhoAtencao()
            .corpo(mensagem)
            .centralizado()
            .detalhes(detalhes)
            .adicioneAcaoVoltar(acaoVoltar)
            .alinhamentoCabecalhoCentro()
            .alinhamentoCorpoCentralizado()
            .atencao();
    }
    informacao(mensagem, detalhes) {
        return new ModalBuilder()
            .cabecalhoInfo()
            .corpo(mensagem)
            .centralizado()
            .detalhes(detalhes)
            .adicioneAcaoVoltar()
            .alinhamentoCabecalhoCentro()
            .alinhamentoCorpoCentralizado()
            .informacao();
    }
    exclusao(aoConfirmar, aoRecusar, mensagemDeExclusao) {
        mensagemDeExclusao = mensagemDeExclusao ?? 'Tem certeza que deseja excluir este item?';
        return new ModalBuilder()
            .cabecalho('<i class="fa fa-trash-alt fa-5x text-warning">')
            .corpo(mensagemDeExclusao)
            .adicioneAcoesSimNao(aoConfirmar)
            .alinhamentoCorpoCentralizado()
            .antesDeOcultar(aoRecusar)
            .alinhamentoCabecalhoCentro()
            .centralizado()
            .atencao();
    }
    confirmacao(mensagem, aoConfirmar, aoRecusar) {
        return new ModalBuilder()
            .cabecalhoAtencao()
            .corpo(mensagem)
            .adicioneAcoesSimNao(aoConfirmar, aoRecusar)
            .alinhamentoCorpoCentralizado()
            .alinhamentoCabecalhoCentro()
            .centralizado()
            .atencao();
    }
    carregamento() {
        return new ModalBuilder()
            .corpo('<div><i class="fa fa-spinner text-info"></i></div>')
            .alinhamentoCorpoCentralizado()
            .centralizado()
            .estatico();
    }
}

class ModalComponent {
    constructor() {
        const modal = document.createElement2('div', 'modal fade');
        Object.assign(modal, this);
        modal.reset();
        return modal;
    }

    reset = function () {
        this.acoes = [];
        this.estilo = 'primary';
    }
    renderize = function () {
        this.appendChild(this.crieDialogo());

        this.addEventListener('show.bs.modal', this.antesDeMostrar)
        this.addEventListener('shown.bs.modal', this.depoisDeMostrar)
        this.addEventListener('hide.bs.modal', this.antesDeOcultar)
        this.addEventListener('hidden.bs.modal', this.depoisDeOcultar)

        this.__modal = new bootstrap.Modal(this);

        const form = document.querySelector('form');

        if (form) {
            form.appendChild(this);
            return;
        }

        document.querySelector('body').appendChild(this);
    }
    mostre = function () {
        this.__modal.show();
        this.verifiqueBackdropModal(this);
    }
    onEsc = function (ev) {
        const pressionouESC = ev.which === 27;
        const podeFechar = pressionouESC && !this.estatico;
        if (podeFechar) {
            this.__modal.hide();
        }
    }
    crieDialogo = function () {
        if (this.estatico) {
            this.setAttribute('data-bs-backdrop', 'static');
            this.setAttribute('data-bs-keyboard', 'false');
        }
        const dialogo = document.createElement2('div', 'modal-dialog');
        if (this.centralizado) dialogo.classList.add('modal-dialog-centered');
        if (this.largo) dialogo.classList.add("modal-lg");
        if (this.fullScreen) dialogo.classList.add('modal-fullscreen');
        else if (this.xlargo) dialogo.classList.add("modal-xlg");
        else if (this.fullWidth) dialogo.classList.add("modal-full-width");
        else if (this.fullModal) dialogo.classList.add("modal-full");
        dialogo.setAttribute('role', 'document');
        dialogo.appendChild(this.crieContent());
        return dialogo;
    }
    crieContent = function () {
        const classes = `modal-content border-0 p-3 ${this.classeExtra ? this.classeExtra : ''}`;
        const content = document.createElement2('div', classes);
        if (this.cabecalho) content.appendChild(this.crieCabecalho());
        if (this.corpo) content.appendChild(this.crieCorpo());
        if (this.rodape) content.appendChild(this.crieRodape());
        if (this.rodapeErro) content.appendChild(this.crieRodapeErro());
        if (this.rodapeSucesso) content.appendChild(this.crieRodapeSucesso());
        if (this.rodapeAtencao) content.appendChild(this.crieRodapeAtencao());
        if (this.detalhes) content.appendChild(this.crieDetalhes());
        if (this.acoes.length) content.appendChild(this.crieAcoes());
        return content;
    }
    crieCabecalho = function () {
        const classes = `modal-header d-flex ${this.alinharCabecalhoCentro ? 'justify-content-center' : ''} border-0 ${this.diminuirCabecalho ? 'p-0 m-0' : ''}`;
        const cabecalho = document.createElement2('div', classes);
        if (typeof this.cabecalho === 'string') cabecalho.innerHTML = this.cabecalho;
        else cabecalho.appendChild(this.cabecalho);
        return cabecalho;
    }
    crieCorpo = function () {
        let classes;
        if (this.fullScreen) {
            classes = `${this.ocuparTodoEspaco ? 'modal-body-full pt-3' : 'modal-body modal-body-fullScreen'} d-flex flex-column ${this.alinhamentoTextCorpo ? this.alinhamentoTextCorpo : 'text-center'}`;
        } else {
            classes = `modal-body d-flex flex-column ${this.alinhamentoTextCorpo ? this.alinhamentoTextCorpo : 'text-center'}`;
        }
        const corpo = document.createElement2('div', classes);
        if (typeof this.corpo === 'string') corpo.innerHTML = this.corpo;
        else corpo.appendChild(this.corpo);
        return corpo;
    }
    crieRodape = function () {
        const classes = 'modal-footer d-flex justify-content-center border-0';
        const rodape = document.createElement2('div', classes);
        if (typeof this.rodape === 'string') rodape.innerHTML = this.rodape;
        else rodape.appendChild(this.rodape);
        return rodape;
    }
    crieRodapeErro = function () {
        const classes = 'text-danger text-center d-flex flex-column p-3';
        const rodapeErro = document.createElement2('div', classes);
        rodapeErro.innerHTML = this.rodapeErro;
        return rodapeErro;
    }
    crieRodapeSucesso = function () {
        const classes = 'text-success text-center d-flex flex-column p-3';
        const rodapeSucesso = document.createElement2('div', classes);
        rodapeSucesso.innerHTML = this.rodapeSucesso;
        return rodapeSucesso;
    }
    crieRodapeAtencao = function () {
        const classes = 'text-warning text-center d-flex flex-column p-3';
        const rodapeAtencao = document.createElement2('div', classes);
        rodapeAtencao.innerHTML = this.rodapeAtencao;
        return rodapeAtencao;
    }
    crieDetalhes = function () {
        const separador = document.createElement2('strong', 'd-block p-3');
        separador.style.setProperty('margin-left', '0px', 'important');
        separador.style.setProperty('margin-right', '0px', 'important');
        separador.style.setProperty('color', `var(--${this.estilo})`, 'important');
        separador.style.marginRight = '0px !important';
        separador.innerText = 'Detalhes da operação';

        const mensagem = document.createElement2('strong', 'd-block px-3 pb-3');
        mensagem.innerHTML = this.detalhes;

        const container = document.createElement2('div', 'collapse');
        container.style.background = 'var(--secondary-70)';
        container.style.borderRadius = 'var(--radius)';
        container.appendChild(separador);
        container.appendChild(mensagem);

        const detalhes = document.createElement2('p', 'text-center m-0');
        detalhes.appendChild(container);

        const htmlExibir = `<i class='fa fa-eye me-2'></i>Exibir detalhes`;
        const htmlOcultar = `<i class='fa fa-eye-slash me-2'></i>Ocultar detalhes`;

        const botao = document.createElement2('button', `btn btn-outline-${this.estilo} mt-auto`);
        botao.innerHTML = htmlExibir;
        botao.dataset.toggle = 'collapse';
        botao.setAttribute('aria-expanded', 'false');

        var collapseDetalhesModal = Collapse.decore(container);

        botao.onclick = ev => {
            const elemento = ev.currentTarget;
            const ehExibir = elemento.innerText === 'Exibir detalhes';
            elemento.innerHTML = ehExibir ? htmlOcultar : htmlExibir;
            collapseDetalhesModal.toggle();
        };

        this.acoes.unshift(botao);

        return detalhes;
    }
    crieAcoes = function () {
        const classes = 'modal-footer d-flex justify-content-center border-0';
        const container = document.createElement2('div', classes);

        this.acoes.forEach(acao => {
            const construtor = acao.constructor.name;
            const ehBotao = construtor === "HTMLButtonElement";
            if (ehBotao) return container.appendChild(acao);
            container.appendChild(this.crieBotaoAcao(acao));
        });

        return container;
    }
    crieBotaoAcao = function (acao) {
        const ehUltimo = acao === this.acoes.slice(-1)[0];
        const classes = `btn ${ehUltimo ? 'btn-' + this.estilo : 'btn-outline-' + this.estilo}`;
        const botao = document.createElement2('button', classes);
        botao.innerHTML = !acao.icone ? acao.texto : `<i class='fa ${acao.icone} me-2'></i>${acao.texto}`;
        if (acao.callback) botao.addEventListener('click', ev => acao.callback(ev));
        if (!acao.temVerificacao) botao.addEventListener('click', ev => this.aoFecharModalMensagemPadrao(ev));
        return botao;
    }
    removaModal = function () {
        this.__modal.dispose();
        this.remove();
    }
    aoFecharModalMensagemPadrao = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        setTimeout(() => { this.ajusteScrowModalAtiva(), 500 });
        this.__modal.hide();
    }
    hide = function () {
        this.__modal.hide();
        setTimeout(() => { this.ajusteScrowModalAtiva(), 500 });
    }
    show = function () {
        this.__modal.show();
        this.verifiqueBackdropModal(this);
        document.body.parentNode.style.overflow = 'hidden';
    }
    verifiqueBackdropModal = function (modalNova) {
        const backdropsAbertos = document.querySelectorAll('.modal-backdrop.show').toArray();
        const modaisAberto = document.querySelectorAll('.modal.show').toArray();

        if (backdropsAbertos.length > 1) {

            const ultimobackdrop = backdropsAbertos[backdropsAbertos.length - 1];
            const ultimaModalAberta = modaisAberto[modaisAberto.length - 1];

            if (ultimobackdrop && ultimaModalAberta) {
                ultimobackdrop.style.zIndex = parseInt(getComputedStyle(ultimaModalAberta).zIndex) + 1;
            }
            if (modalNova && ultimobackdrop) {
                modalNova.style.zIndex = parseInt(getComputedStyle(ultimobackdrop).zIndex) + 1;
            }
            return;
        }
        return;
    }
    ajusteScrowModalAtiva = function () {
        var modalAtiva = Array.from(document.querySelectorAll(".modal.show")).reverse();
        if (modalAtiva && modalAtiva.length > 0) {
            document.body.parentNode.style.overflow = 'hidden';
            modalAtiva[0].style.overflowY = "auto";
        } else {
            document.body.parentNode.style.overflow = 'auto'
        }
    }
}

class ModalBuilder {
    constructor() {
        this.component = new ModalComponent();
        this.component.forceEventos = true;
    }
    cabecalho(html) {
        this.component.cabecalho = html;
        return this;
    }
    cabecalhoErro() {
        return this.cabecalho('<i class="fa fa-times fa-5x text-danger">');
    }
    cabecalhoSucesso() {
        return this.cabecalho('<i class="fa fa-check fa-5x text-success">');
    }
    cabecalhoAtencao() {
        return this.cabecalho('<i class="fa fa-exclamation-triangle fa-5x text-warning">');
    }
    cabecalhoInfo() {
        return this.cabecalho('<i class="fa fa-info-circle fa-5x text-primary">');
    }
    diminuirCabecalho() {
        this.component.diminuirCabecalho = true;
        return this;
    }
    adicioneClasse(classe) {
        this.component.classeExtra = classe;

        return this;
    }
    corpo(html) {
        this.component.corpo = html;
        return this;
    }
    alinhamentoCabecalhoCentro() {
        this.component.alinharCabecalhoCentro = true;
        return this;
    }
    alinhamentoCorpoJustificado() {
        this.component.alinhamentoTextCorpo = 'text-justify';
        return this;
    }
    alinhamentoCorpoCentralizado() {
        this.component.alinhamentoTextCorpo = 'text-center';
        return this;
    }
    alinhamentoCorpoDireita() {
        this.component.alinhamentoTextCorpo = 'text-right';
        return this;
    }
    alinhamentoCorpoEsquerda() {
        this.component.alinhamentoTextCorpo = 'text-left';
        return this;
    }
    rodape(html) {
        this.component.rodape = html;
        return this;
    }
    rodapeErro(mensagem) {
        this.component.rodapeErro = mensagem;
        return this;
    }
    rodapeSucesso(mensagem) {
        this.component.rodapeSucesso = mensagem;
        return this;
    }
    rodapeAtencao(mensagem) {
        this.component.rodapeAtencao = mensagem;
        return this;
    }
    ocuparTodoEspaco() {
        this.component.ocuparTodoEspaco = true;
        return this;
    }
    detalhes(html) {
        this.component.detalhes = html;
        return this;
    }
    adicioneAcaoVoltar(callback) {
        if (callback) {
            return this.adicioneAcao('Voltar', 'fa-arrow-left', callback);
        }

        return this.adicioneAcao('Voltar', 'fa-arrow-left');
    }
    adicioneAcaoGravar(callback, temVerificacao) {
        return this.adicioneAcao('Gravar', 'fa-save', callback, temVerificacao);
    }
    adicioneAcaoSim(callback) {
        this.adicioneAcao('Sim', 'fa-check', callback);
        return this;
    }
    adicioneAcaoSimLabelDiferente(callback, label) {
        this.adicioneAcao(label, 'fa-check', callback);
        return this;
    }
    adicioneAcaoNao(callback) {
        this.adicioneAcao('Não', 'fa-times', callback);
        return this;
    }
    adicioneAcaoNaoLabelDiferente(callback, label) {
        this.adicioneAcao(label, 'fa-times', callback);
        return this;
    }
    adicioneAcoesSimNao(callbackSim, callbackNao) {
        this.adicioneAcaoSim(callbackSim);
        this.adicioneAcaoNao(callbackNao);
        return this;
    }
    adicioneAcoesSimNaoCustom(callbackSim, botaoSim, callbackNao, botaoNao) {
        this.adicioneAcaoSimLabelDiferente(callbackSim, botaoSim);
        this.adicioneAcaoNaoLabelDiferente(callbackNao, botaoNao);
        return this;
    }
    adicioneAcao(texto, icone, callback, temVerificacao) {
        const acao = { texto, icone, callback, temVerificacao }
        this.component.acoes.push(acao);
        return this;
    }
    antesDeMostrar = function (func) {
        this.component.antesDeMostrar = func;
        return this;
    }
    depoisDeMostrar = function (func) {
        this.component.depoisDeMostrar = func;
        return this;
    }
    antesDeOcultar = function (func) {
        this.component.antesDeOcultar = func;
        return this;
    }
    depoisDeOcultar = function (func) {
        this.component.depoisDeOcultar = func;
        return this;
    }
    erro() {
        this.component.estilo = 'danger';
        this.component.estatico = true;
        return this;
    }
    sucesso() {
        this.component.estilo = 'success';
        this.component.estatico = true;
        return this;
    }
    atencao() {
        this.component.estilo = 'warning';
        this.component.estatico = true;
        return this;
    }
    informacao() {
        this.component.estilo = 'info';
        this.component.estatico = true;
        return this;
    }
    centralizado() {
        this.component.centralizado = true;
        return this;
    }
    largo() {
        this.component.largo = true;
        this.component.xlargo = false;
        return this;
    }
    xlargo() {
        this.component.largo = false;
        this.component.xlargo = true;
        return this;
    }
    fullWidth() {
        this.component.largo = false;
        this.component.xlargo = false;
        this.component.fullWidth = true;
        return this;
    }
    fullModal() {
        this.component.largo = false;
        this.component.xlargo = false;
        this.component.fullWidth = false;
        this.component.fullModal = true;
        return this;
    }
    fullScreen() {
        this.component.fullScreen = true;
        this.component.semBorder = true;
        return this;
    }
    estatico() {
        this.component.estatico = true;
        return this;
    }
    naoEstatico() {
        this.component.estatico = false;
        return this;
    }
    render() {
        this.component.renderize();
        this.component.mostre();

        return this.component;
    }
    renderSemMostrar() {
        this.component.renderize();

        return this.component;
    }
}
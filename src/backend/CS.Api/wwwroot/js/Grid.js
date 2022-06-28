class Grid {
    constructor(options, datasource) {
        this._options = options;
        this._elementos = {};
        this._manipuladores = {};
        this.prepareOptions();
        this.prepareElementos();
        this.prepareManipuladores(datasource);
        this.bind();
    }
    prepareOptions() {
        this._options.margemCellsGrid = '0.5rem';
        this._options.timeouts = [];
        this._options.itensSendoExcluidos = [];
    }
    prepareElementos() {
        this._elementos.grid = document.getElementById(this._options.idPrefixado);
        this._elementos.container = this._elementos.grid.querySelector('.em-grid-container');
        this._elementos.inputDatasource = this._elementos.grid.querySelector(`#${this._options.id}_Datasource`);
        this._elementos.inputDatasourceSelecionados = this._elementos.grid.querySelector(`#${this._options.id}Selecionados`);
        this._elementos.inputPesquisa = this._elementos.container.querySelector('.em-grid-pesquisar');
        this._elementos.inputFiltroAtivo = document.getElementById("DropDownAtivoFiltro");
        this._elementos.containerBodyMain = this._elementos.container.querySelector('.em-grid-body-main');
        this._elementos.containerBody = this._elementos.container.querySelector('.em-grid-body');
        this._elementos.containerHeader = this._elementos.container.querySelector('.em-grid-header');
        this._elementos.grid.Grid = this;
        if (this._options.permitePesquisa) this.prepareInputPesquisa();
    }
    selecionePorCodigo(codigo) {
        const item = this.getData().find(finalidade => finalidade.Codigo === codigo);

        if (item) item.selected = true;
    }
    desmarquePorCodigo(codigo) {
        const item = this.getData().find(finalidade => finalidade.Codigo === codigo);

        if (item) item.selected = false;
        this.bind();
    }
    prepareInputPesquisa() {
        if (this._options.pesquiseServerSide) this.prepareInputPesquisaServerSide();
        else this.prepareInputPesquisaClientSide();
    }
    prepareInputPesquisaServerSide() {
        var wto = undefined;
        const dropDownfiltroAtivo = this._elementos.inputFiltroAtivo;


        var pesquise = () => {
            clearTimeout(wto);

            var input = dropDownfiltroAtivo ? {
                termoPesquisa: this._elementos.inputPesquisa.value,
                filtroAtivo: this._elementos.inputFiltroAtivo.value
            } : { termoPesquisa: this._elementos.inputPesquisa.value }


            wto = setTimeout(() => this._manipuladores.filtro.pesquiseServerSide(input).then((resultado) => {
                this._manipuladores.datasource.setData(resultado);
                this.bind();
            }), 500);
        }

        var eventoKeyupPesquisa = (ev) => {
            if (ev.keyCode !== 8 && !ehAlfanumerico(ev)) return;
            pesquise();
        }
        if (dropDownfiltroAtivo)
            dropDownfiltroAtivo.addEventListener('change', pesquise);

        this._elementos.inputPesquisa.addEventListener('keyup', eventoKeyupPesquisa);
    }
    prepareInputPesquisaClientSide() {
        const filtroAtivo = this._elementos.inputFiltroAtivo;

        if (filtroAtivo) {

            filtroAtivo.addEventListener('change', () => {
                let elementosGrid = Array.from(document.getElementById("grid-body").children);
                let dropDown = this._elementos.inputFiltroAtivo;
                if (dropDown.value === '3') {
                    elementosGrid.forEach(el => {
                        el.hidden = false;
                    });
                    return;
                }

                let valor = dropDown.value === '1' ? false : true;
                elementosGrid.forEach(el => {
                    if (el.row["EstaAtivo"] === valor) {
                        el.hidden = true;
                    }
                    else {
                        el.hidden = false;
                    }
                })
            });
        }

        this._elementos.inputPesquisa.addEventListener('keyup', (ev) => {
            this._manipuladores.renderizacao.showLoading();
            this._manipuladores.renderizacao.limpeBody();
            this._manipuladores.filtro.pesquiseClientSide(ev);
            this.bind();
        });
    }
    prepareManipuladores(datasource) {
        if (this._options.permiteUnicaSelecao || this._options.permiteMultiplaSelecao) this._manipuladores.selecao = new GridManipuladorSelecao(this._options, this._manipuladores, this._elementos);
        if (datasource) this._manipuladores.datasource = new GridManipuladorDatasource(this._options, this._manipuladores, this._elementos, datasource);
        this._manipuladores.header = new GridManipuladorHeader(this._options, this._manipuladores, this._elementos);
        this._manipuladores.body = new GridBody(this._options, this._manipuladores, this._elementos);
        this._manipuladores.ordenacao = new GridManipuladorOrdenacao(this._options, this._manipuladores, this._elementos);
        this._manipuladores.filtro = new GridManipuladorFiltro(this._options, this._manipuladores, this._elementos);
        this._manipuladores.highlight = new GridManipuladorHighlight(this._options);
        this._manipuladores.renderizacao = new GridManipuladorRenderizacao(this._options, this._manipuladores, this._elementos);
        if (this._options.permiteArrastar) this._manipuladores.drag = new GridManipuladorDrag(this._options, this._manipuladores, this._elementos);
    }
    // RENDERIZAÇÃO
    bind() {
        this._manipuladores.renderizacao.bind();
    }
    definaLarguraInterna(largura) {
        this._elementos.grid.style.paddingBottom = '0.75rem';
        this._elementos.containerHeader.querySelector('.em-grid-row').style.minWidth = largura + 'px';
        this._elementos.containerBody.style.minWidth = largura + 'px';

        this._elementos.containerBodyMain.onscroll = ev => {
            this._elementos.containerHeader.scrollLeft = this._elementos.containerBodyMain.scrollLeft;
        };
    }
    // SELEÇÃO
    obtenhaSelecionados() {
        return this._manipuladores.selecao.obtenha();
    }
    selecioneTodos() {
        if (!this._manipuladores.selecao) return;
        this._manipuladores.selecao.selecioneTodos();
    }
    selecionePrimeiro() {
        if (!this._manipuladores.selecao) return;
        this._manipuladores.selecao.selecionePrimeiro();
    }
    selecioneProximo() {
        if (!this._manipuladores.selecao) return;
        this._manipuladores.selecao.selecioneProximo();
    }
    selecioneAnterior() {
        if (!this._manipuladores.selecao) return;
        this._manipuladores.selecao.selecioneAnterior();
    }
    limpeSelecao() {
        if (!this._manipuladores.selecao) return;
        this._manipuladores.selecao.limpe();
    }
    // FILTRO
    adicioneFiltroIgualdade(chave, valor) {
        this._manipuladores.filtro.adicioneFiltroIgualdade(chave, valor)
    }
    adicioneFiltroSimilaridade(chave, valor) {
        this._manipuladores.filtro.adicioneFiltroSimilaridade(chave, valor)
    }
    adicioneFiltroMaiorQue(chave, valor) {
        this._manipuladores.filtro.adicioneFiltroMaiorQue(chave, valor)
    }
    adicioneFiltroMenorQue(chave, valor) {
        this._manipuladores.filtro.adicioneFiltroMenorQue(chave, valor)
    }
    removeFiltro(chave) {
        this._manipuladores.filtro.removeFiltro(chave)
    }
    limpeFiltros() {
        this._manipuladores.filtro.limpeFiltros()
    }
    filtre(datasource) {
        return this._manipuladores.filtro.filtre(datasource);
    }
    pesquiseServerSide(data, alternativeAction) {
        this._manipuladores.filtro.pesquiseServerSide(data, alternativeAction).then((resultado) => {
            this._manipuladores.datasource.setData(resultado);
            this.bind();
        });
    }
    // DATASOURCE
    addRange(objs) {
        this._manipuladores.datasource.addRange(objs);
        this.bind();
    }
    add(obj) {
        this._manipuladores.datasource.add(obj);
        this.bind();
    }
    addSemBind(obj) {
        this._manipuladores.datasource.add(obj);
    }
    edit(dicionarioTermosPesquisa, obj) {
        this._manipuladores.datasource.edit(dicionarioTermosPesquisa, obj);
        this.bind();
    }
    remove(obj) {
        this._manipuladores.datasource.remove(obj);
        this.bind();
    }
    removeList(obj) {
        this._manipuladores.datasource.removeList(obj);
        this.bind();
    }
    clear() {
        this._manipuladores.datasource.clear();
        this.bind();
    }
    getData(index) {
        if (index === undefined) return this._manipuladores.datasource.getData();
        if (Number.isNaN(index)) throw "O parâmetro deve ser nulo ou um número válido";
        else return this._manipuladores.datasource.getData()[index];
    }
    setData(novoDatasource) {
        this._manipuladores.datasource.setData(novoDatasource);
        this.bind();
    }
    marqueEditando(dicionarioTermosPesquisa) {
        return this._manipuladores.datasource.marqueEditando(dicionarioTermosPesquisa);
    }
    contem(dicionarioTermosPesquisa) {
        return this._manipuladores.datasource.contem(dicionarioTermosPesquisa);
    }
    contemExcetoEditando(dicionarioTermosPesquisa) {
        return this._manipuladores.datasource.contemExcetoEditando(dicionarioTermosPesquisa);
    }
    obtenhaIndex(dicionarioTermosPesquisa, ignorarItemEditando) {
        return this._manipuladores.datasource.obtenhaIndex(dicionarioTermosPesquisa, ignorarItemEditando);
    }
    obtenha(dicionarioTermosPesquisa) {
        return this._manipuladores.datasource.obtenha(dicionarioTermosPesquisa);
    }
    obtenhaExpressaoComparacao(dicionarioTermosPesquisa, prefixoRecursividade, ignorarItemEditando) {
        return this._manipuladores.datasource.obtenhaExpressaoComparacao(dicionarioTermosPesquisa, prefixoRecursividade, ignorarItemEditando);
    }
    // ORDENAÇÃO
    definaOrdenacao() {
        this._manipuladores.ordenacao.definaOrdenacao(Array.from(arguments));
    }
    // HIGHLIGHT
    adicioneHighlightDanger(propriedade, valor, operador, tipoValor) {
        this.adicioneHighlightGeral('danger', propriedade, valor, operador, tipoValor);
    }
    adicioneHighlightWarning(propriedade, valor, operador, tipoValor) {
        this.adicioneHighlightGeral('warning', propriedade, valor, operador, tipoValor);
    }
    adicioneHighlightSuccess(propriedade, valor, operador, tipoValor) {
        this.adicioneHighlightGeral('success', propriedade, valor, operador, tipoValor);
    }
    adicioneHighlightInfo(propriedade, valor, operador, tipoValor) {
        this.adicioneHighlightGeral('info', propriedade, valor, operador, tipoValor);
    }
    adicioneHighlightDark(propriedade, valor, operador, tipoValor) {
        this.adicioneHighlightGeral('dark', propriedade, valor, operador, tipoValor);
    }
    adicioneHighlightGeral(estilo, propriedade, valor, operador = '===', tipoValor = 'string') {
        const highlight = {
            Estilo: estilo,
            Validacoes: [{
                Operador: operador,
                TipoValor: tipoValor,
                Propriedade: propriedade,
                Valor: valor
            }]
        }

        this._manipuladores.highlight.adicioneGeral(highlight);
    }
    limpeHighlight() {
        this._manipuladores.highlight.limpe();
    }
    // EVENTOS
    desabilite() {
        this._elementos.container.classList.add('desabilitado');
    }
    habilite() {
        this._elementos.container.classList.remove('desabilitado');
    }
    aoSelecionar(nomeFuncao) {
        this._options.aoSelecionar = nomeFuncao;
    }
    aoRenderizar(nomeFuncao) {
        this._options.aoRenderizar = nomeFuncao;
    }
    adicioneColuna(coluna, index) {
        if (!index) return this._options.colunas.push(coluna);
        else this._options.colunas.splice(index, 0, coluna);
    }
    removerColuna(index) {
        this._options.colunas.splice(index, 1);
    }
    resetColunas() {
        this._options.colunas = this._options.colunas.filter(coluna => !coluna.ColunaAdicional);
    }
    crieColuna({
        Acoes: Acoes = [],
        Highlights: Highlights = [],
        Title: Title = "",
        Property: Property = "",
        PropertyOrdenacao: PropertyOrdenacao = "",
        Template: Template = "",
        AoDigitar: AoDigitar = "",
        FlexBasis: FlexBasis = null,
        EhMobile: EhMobile = false,
        EhEditavel: EhEditavel = false,
        EhHabilitado: EhHabilitado = true,
        ApenasNumeros: ApenasNumeros = false,
        CasasDecimais: CasasDecimais = 0,
        PermiteOrdenar: PermiteOrdenar = false,
        PermiteQuebrarLinha: PermiteQuebrarLinha = false,
        EhDropdown: EhDropdown = false,
        EhCheckbox: EhCheckbox = false,
        ItemDropDownNome: ItemDropDownNome = "",
        Centralizado: Centralizado = false,
        MargemEsquerda: MargemEsquerda = 0,
        MargemDireita: MargemDireita = 0
    } = {}) {
        return {
            Acoes,
            Highlights,
            Title,
            Property,
            PropertyOrdenacao,
            Template,
            AoDigitar,
            FlexBasis,
            EhMobile,
            EhEditavel,
            EhHabilitado,
            ApenasNumeros,
            CasasDecimais,
            PermiteOrdenar,
            PermiteQuebrarLinha,
            EhDropdown,
            EhCheckbox,
            ItemDropDownNome,
            Centralizado,
            MargemEsquerda,
            MargemDireita
        }
    }
}

class GridManipuladorRenderizacao {
    constructor(options, manipuladores, elementos) {
        this._options = options;
        this._manipuladores = manipuladores;
        this._elementos = elementos;
    }
    getData() {
        return this._datasource;
    }
    _obtenhaPosicaoNoTopo() {
        const container = this._elementos.containerHeader;
        const barraFerramentas = document.querySelector('.barraFerramentas');
        const estaDentroDeModal = container.closest('.modal');
        if (!barraFerramentas || estaDentroDeModal) return 0;
        return 65; // barraFerramentas.clientHeight;
    }
    monteHeader() {
        let row = document.createElement2('div', 'em-grid-row');
        if (this._options.permiteMultiplaSelecao) this._manipuladores.selecao.crieCheckboxHeader(row);
        this._options.colunas.forEach((coluna) => {
            let celula = this._manipuladores.header.crieColuna(coluna);
            if (coluna.PermiteOrdenar) {
                let ordenacao = this._manipuladores.ordenacao.crie(coluna);
                ordenacao.addEventListener('click', () => this.bind());
                celula.appendChild(ordenacao);
            }
            row.appendChild(celula);
        });
        if (this._options.acoes && this._options.acoes.length) {
            let celula = this._manipuladores.header.crieCelulaAction();
            if (this._options.permiteMultiplaSelecao) this._manipuladores.selecao.crieMultiplaExclusao(celula);
            row.appendChild(celula);
        }

        const container = this._elementos.containerHeader;
        const top = `${this._obtenhaPosicaoNoTopo()}px`;

        container.removeChildren();
        container.appendChild(row);
        container.style.top = top;
        container.style.overflow = 'hidden';
    }
    limpeBody() {
        this._elementos.containerBody.removeChildren();
    }
    monteBody() {
        this._manipuladores.body.monteBodyComFragmento(this._datasource);

        if (this._manipuladores.drag) this._manipuladores.drag.prepare();
    }
    showLoading() {
        this._elementos.containerBody.classList.add('em-grid-loading');
    }
    hideLoading() {
        this._elementos.containerBody.classList.remove('em-grid-loading');
    }
    obtenhaCodigosEnumerador() {
        return this._manipuladores
            .datasource
            .getData()
            .reduce((arr, data) => {
                arr.push(data.Codigo);
                return arr;
            }, []);
    }
    bind(ehBindOrdem) {
        this.monteHeader();
        this.showLoading();
        this.limpeBody();
        this._manipuladores.datasource.ajusteControlesInternos(ehBindOrdem);
        this._datasource = this._manipuladores.datasource.getData();
        if (Object.keys(this._manipuladores.filtro.getFiltros()).length) this._datasource = this._manipuladores.filtro.filtre(this._datasource);
        if (this._manipuladores.ordenacao._ordenacaoDefinida) this._datasource = this._manipuladores.ordenacao.ordene(this._datasource);
        this._manipuladores.highlight._prepareEspecificos();
        this.atualizeInputDatasource();
        this.monteBody();
        this.hideLoading();

        if (window[this._options.aoRenderizar]) {
            this._options.aoRenderizar && window[this._options.aoRenderizar]();
        }
    }
    atualizeInputDatasource() {
        this._elementos.inputDatasource.value = this._options.ehModelEnumerador
            ? JSON.stringify(this.obtenhaCodigosEnumerador())
            : JSON.stringify(this._manipuladores.datasource.getData());
    }
}

class GridManipuladorDatasource {
    constructor(options, manipuladores, elementos, datasource) {
        this._options = options;
        this._manipuladores = manipuladores;
        this._elementos = elementos;
        this._datasource = datasource;
    }
    getData() {
        return this._datasource;
    }
    setData(novoDatasource) {
        if (!this._datasourceCopia) {
            this._datasourceCopia = novoDatasource
        }
        this._datasource = novoDatasource;
        this._atualizeSelecao();
    }
    add(obj) {
        if (!obj) return;
        this._datasource.push(obj);

        let grid = window[this._options.idPrefixado];
        this._options.aoAdicionar && window[this._options.aoAdicionar](obj);
        this._atualizeSelecao();
    }
    addRange(objs) {
        if (!objs) return;
        objs.forEach(obj => this.add(obj));
    }
    edit(dicionarioTermosPesquisa, obj) {
        if (!dicionarioTermosPesquisa || !obj) return;
        let index = this.obtenhaIndex(dicionarioTermosPesquisa);
        if (index === undefined) return;
        this._datasource[index] = obj;
        this._atualizeSelecao();
    }
    remove(obj) {
        let remove = item => this._datasource.forEach((data, index) =>
            JSON.stringify(data) === JSON.stringify(item)
            && this._datasource.splice(index, 1));

        let removeByAggregator = aggregator =>
            this.obtenha({ aggregator }).forEach(remove);

        obj.aggregator ? removeByAggregator(obj.aggregator) : remove(obj);

        let grid = window[this._options.idPrefixado];
        this._options.aoRemover && window[this._options.aoRemover](obj);
        this._atualizeSelecao();
    }
    removeList(obj) {
        obj.forEach(el => this.remove(el));
    }
    clear() {
        this._datasource = [];
        this._atualizeSelecao();
    }
    _atualizeSelecao() {
        if (!this._manipuladores.selecao) return;
        this._manipuladores.selecao.armazene();
    }
    ajusteControlesInternos(ehBindOrdem) {

        const propOrdem = this._options.propriedadeOrdem;
        const inicioOrdem = parseInt(this._options.inicioOrdem);

        const ajusteOrdem = (data, index) =>
            data[propOrdem] = index + inicioOrdem;

        if (!ehBindOrdem) {
            const grid = this;
            this._datasource.sort(function (firstElement, secondElement) {
                if (firstElement.hasOwnProperty("Nome") && secondElement.hasOwnProperty("Nome")) {
                    return grid.ordenePelaPropriedade(firstElement, secondElement, "Nome");
                }
                if (firstElement.hasOwnProperty("Descricao") && secondElement.hasOwnProperty("Descricao")) {
                    return grid.ordenePelaPropriedade(firstElement, secondElement, "Descricao");
                }
            });
        }

        this._datasource.forEach((data, index) => {
            if (propOrdem) ajusteOrdem(data, index);
            data.rowId = index;
            data.editing = false;
            data.removing = false;
        });

        this._atualizeSelecao();
    }
    ordenePelaPropriedade(firstElement, secondElement, propriedade) {
        return firstElement[propriedade]?.localeCompare(secondElement[propriedade]);
    }
    marqueEditando(dicionarioTermosPesquisa) {
        this.desmarqueEditando();
        let naoMarcado = { ...dicionarioTermosPesquisa, editing: false };
        while (this.contem(naoMarcado)) this.marqueDesmarque(naoMarcado, 'editing', 'em-grid-editing-row', true);
    }
    desmarqueEditando() {
        while (this.contem({ editing: true }))
            this.marqueDesmarque({ editing: true }, 'editing', 'em-grid-editing-row', false);
    }
    marqueRemovendo(dicionarioTermosPesquisa) {
        this.desmarqueRemovendo();
        let naoMarcado = { ...dicionarioTermosPesquisa, removing: false };
        while (this.contem(naoMarcado)) this.marqueDesmarque(naoMarcado, 'removing', 'em-grid-deleting-row', true);
    }
    desmarqueRemovendo() {
        while (this.contem({ removing: true }))
            this.marqueDesmarque({ removing: true }, 'removing', 'em-grid-deleting-row', false);
    }
    marqueDesmarque(dicionarioTermosPesquisa, propriedade, classe, estaMarcando) {
        if (!dicionarioTermosPesquisa) return true;
        let indexDatasource = this.obtenhaIndex(dicionarioTermosPesquisa, false);
        let indexLinha = this.obtenhaIndex(dicionarioTermosPesquisa, false, true);
        let linhas = this._elementos.containerBody.querySelectorAll('.em-grid-row');
        let linhaSendoEditada = linhas[indexLinha];
        if (!this._datasource[indexDatasource] || !linhaSendoEditada) return;
        this._datasource[indexDatasource][propriedade] = estaMarcando;
        if (estaMarcando) linhaSendoEditada.classList.add(classe);
        else linhaSendoEditada.classList.remove(classe);
        this._manipuladores.selecao && this._manipuladores.selecao.mostreOculte(estaMarcando);
        if (propriedade === 'editing') linhaSendoEditada.querySelector('.em-grid-action').style.visibility = estaMarcando ? 'hidden' : 'visible';
    }
    contem(dicionarioTermosPesquisa) {
        if (!dicionarioTermosPesquisa) return true;
        return this.obtenhaIndex(dicionarioTermosPesquisa, false) !== undefined;
    }
    contemExcetoEditando(dicionarioTermosPesquisa) {
        if (!dicionarioTermosPesquisa) return true;
        return this.obtenhaIndex(dicionarioTermosPesquisa, true) !== undefined;
    }
    obtenhaIndex(dicionarioTermosPesquisa, ignorarItemEditando, usarDatasourceFiltrado) {
        if (!dicionarioTermosPesquisa) return;
        let expressaoComparacao = this.obtenhaExpressaoComparacao(dicionarioTermosPesquisa, "", ignorarItemEditando);
        let indexRow;
        let datasource = usarDatasourceFiltrado ? this._manipuladores.renderizacao.getData() : this._datasource;
        datasource.find((row, index) => {
            try {
                if (eval(expressaoComparacao)) {
                    indexRow = index;
                    return true;
                }
            } catch {
                return false;
            }
        });
        return indexRow;
    }
    obtenha(dicionarioTermosPesquisa) {
        if (!dicionarioTermosPesquisa) return;
        let expressaoComparacao = this.obtenhaExpressaoComparacao(dicionarioTermosPesquisa);
        return this._datasource.filter((row) => {
            try { return eval(expressaoComparacao); }
            catch { return false; }
        });
    }
    obtenhaExpressaoComparacao(dicionarioTermosPesquisa, prefixoRecursividade, ignorarItemEditando) {
        if (!dicionarioTermosPesquisa) return;
        let prefixo = prefixoRecursividade ? prefixoRecursividade + "." : "";
        let comparacoes = [];
        for (let propriedade in dicionarioTermosPesquisa) {
            if (Array.isArray(dicionarioTermosPesquisa[propriedade])) continue;
            if (dicionarioTermosPesquisa[propriedade] instanceof Object) {
                comparacoes.push(this.obtenhaExpressaoComparacao(dicionarioTermosPesquisa[propriedade], propriedade));
            } else {
                comparacoes.push(`row.${prefixo}${propriedade}.toString() == "${dicionarioTermosPesquisa[propriedade]}"`);
            }
        }
        if (ignorarItemEditando) comparacoes.push(`!row.${prefixo}editing`);
        return comparacoes.join(" && ");
    }
}

class GridUtilidades {
    static configureTooltip(elemento, titulo, estilo) {
        elemento.setAttribute('title', titulo);
        elemento.setAttribute('data-bs-toggle', estilo);
    }
}

class GridManipuladorFiltro {
    constructor(options, manipuladores, elementos) {
        this._options = options;
        this._manipuladores = manipuladores;
        this._elementos = elementos;
        this._filtros = [];
    }
    getFiltros() {
        return this._filtros;
    }
    pesquiseClientSide(ev) {
        for (let propriedade of this._options.pesquisePor) {
            this.adicioneFiltroSimilaridade(propriedade, ev.target.value);
        }
    }
    pesquiseServerSide(data, alternativeAction) {
        this._manipuladores.renderizacao.showLoading();
        this._manipuladores.renderizacao.limpeBody();
        let action = alternativeAction || this._options.actionPesquisePadrao;
        return postJSON(action, data);
    }
    adicioneFiltroIgualdade(chave, valor) {
        this._filtros[chave] = `item.${chave}?.toString().toLowerCase().semAcentos() == "${valor.toLowerCase().semAcentos()}"`;
    }
    adicioneFiltroSimilaridade(chave, valor) {
        this._filtros[chave] = `item.${chave}?.toString().toLowerCase().semAcentos().includes("${valor.toLowerCase().semAcentos()}")`;
    }
    adicioneFiltroMaiorQue(chave, valor) {
        this._filtros[chave] = `item.${chave} > "${valor}"`;
    }
    adicioneFiltroMenorQue(chave, valor) {
        this._filtros[chave] = `item.${chave} < "${valor}"`;
    }
    removeFiltro(chave) {
        delete this._filtros[chave];
    }
    limpeFiltros() {
        this._filtros = [];
    }
    filtre(datasource) {
        return datasource.filter(item => eval(Object.values(this._filtros).join(' || ')));
    }
}

class GridHeaderBody {
    constructor(options, elementos) {
        this._options = options;
        this._elementos = elementos;
    }
    definaMargens(coluna, celula) {
        celula.style.marginLeft = this.obtenhaMargem(coluna.MargemEsquerda);
        celula.style.marginRight = this.obtenhaMargem(coluna.MargemDireita);
    }
    definaLargura(coluna, celula) {
        if (coluna.FlexBasis) {
            celula.style.flexBasis = `${coluna.FlexBasis}px`;
            celula.style.flexGrow = 0;
            celula.style.flexShrink = 0;
        }
    }
    obtenhaMargem(margem) {
        return margem ? `${margem}rem` : this.margemCellsGrid;
    }
    obtenhaClasses(coluna) {
        let classes = 'em-grid-cell';
        if (coluna.Centralizado) classes += ' em-grid-cell-center';
        if (coluna.PermiteQuebrarLinha) classes += ' em-grid-cell-word-wrap';
        if (!this._options.possuiColunasMobile) {
            classes += " d-flex";
            return classes;
        }
        if (coluna.EhMobile) {
            classes += " d-flex flex-column d-xl-none";
            return classes;
        }
        classes += " d-none d-xl-flex";
        return classes;
    }
}

class GridManipuladorHeader extends GridHeaderBody {
    constructor(options, manipuladores, elementos) {
        super(options, manipuladores, elementos);
    }
    crieColuna(coluna) {
        let celula = document.createElement2('div', this.obtenhaClasses(coluna));
        this.definaMargens(coluna, celula);
        this.definaLargura(coluna, celula);
        if (!coluna.PermiteOrdenar) celula.innerHTML = coluna.Title;
        return celula;
    }
    crieCelulaAction() {
        return document.createElement2('div', 'em-grid-cell em-grid-action d-flex');
    }
}

class GridBody extends GridHeaderBody {
    constructor(options, manipuladores, elementos) {
        super(options, elementos);
        this._manipuladores = manipuladores;
    }
    monteBodyComFragmento(datasource) {
        let fragmentBody = document.createDocumentFragment();

        for (let row of datasource) {
            let linha = this.crieLinha(row);
            fragmentBody.appendChild(linha);
        }

        this._elementos.containerBody.appendChild(fragmentBody);

        const selecao = this._manipuladores.selecao;
        if (selecao) {
            selecao.altereCheckboxTodos();
            selecao.mostreOculteMultiplaExclusao();
        }

        //habiliteTooltips();
    }
    crieLinha(row) {
        let possuiEditar = false;

        this._options.acoes.forEach(ac => {
            if (ac.Title == 'Editar') {
                possuiEditar = true;
            }
        });

        let classes = `em-grid-row ${this.obtenhaHighlightGeral(row)}`;
        let linha = document.createElement2('div', classes);
        if (this._options.permiteMultiplaSelecao) {
            this._manipuladores.selecao.crieCheckboxBody(linha);
        } else if (this._options.permiteUnicaSelecao && !possuiEditar) {
            this._manipuladores.selecao.habilitaSelecao(linha);
        }
        if (row.selected) this._manipuladores.selecao.marque(linha);
        for (let coluna of this._options.colunas) {
            linha.appendChild(this.crieCelula(row, coluna));
        }
        if (this._options.acoes && this._options.acoes.length) {
            const container = document.createElement('div');
            container.classList = 'em-grid-cell em-grid-action d-flex';
            this.crieAcoes(this._options.acoes, row, container);
            linha.appendChild(container);
        }
        linha.row = row;
        return linha;
    }
    obtenhaHighlightGeral(row) {
        return this._manipuladores.highlight.obtenhaEstiloGeral(row);
    }
    crieCelula(row, coluna) {
        const classes = `${this.obtenhaClasses(coluna)} ${this.obtenhaHighlightEspecifico(row, coluna)}`;
        let celula = document.createElement2('div', classes);
        this.definaMargens(coluna, celula);
        this.definaLargura(coluna, celula);
        celula.setAttribute('data-label', coluna.Title);
        celula.setAttribute('id', coluna.Title + "_" + row.rowId);
        this.crieAcoes(coluna.Acoes, row, celula);
        this.monteInnerHtml(row, coluna, celula);
        this.prepareEdicao(row, coluna, celula);
        this.prepareMascaraEdicao(row, coluna, celula);
        this.prepareMascaraEdicaoAceitaNulo(row, coluna, celula);

        return celula;
    }
    obtenhaHighlightEspecifico(row, coluna) {
        return this._manipuladores.highlight.obtenhaEstiloEspecifico(row, coluna.Property || coluna.PropertyOrdenacao);
    }
    prepareEdicao(row, coluna, celula) {
        if (!coluna.EhEditavel) return;

        const atualizeValor = ev => {
            eval(`row.${coluna.Property} = ev.target.textContent`);
            this._manipuladores.renderizacao.atualizeInputDatasource();
            if (!this._manipuladores.selecao) return;
            this._manipuladores.selecao.armazene();
        }

        if (coluna.EhHabilitado) celula.setAttribute('contenteditable', true);
        if (!coluna.EhHabilitado) celula.setAttribute('disabled', 'true');
        celula.addEventListener('blur', atualizeValor);

        if (!coluna.AoDigitar) return;
        const aoDigitar = window[coluna.AoDigitar];
        celula.addEventListener('keydown', aoDigitar);
    }
    prepareMascaraEdicao(row, coluna, celula) {
        if (!coluna.ApenasNumeros) return;
        const nome = 'data-mascara-decimal';
        const config = { precisao: coluna.CasasDecimais };
        const valor = JSON.stringify(config);
        celula.setAttribute(nome, valor);
        if (!row.mascara) row.mascara = [];
        row.mascara.push(coluna.Property);
        row.mascara[coluna.Property] = new MascaraNumerica(celula);

        const atualizeValor = ev => {
            eval(`row.${coluna.Property} = ev.target.textContent`);
            this._manipuladores.renderizacao.atualizeInputDatasource();
            if (!this._manipuladores.selecao) return;
            this._manipuladores.selecao.armazene();
        }

        celula.addEventListener('blur', atualizeValor);

        if (!coluna.AoDigitar) return;
        const aoDigitar = window[coluna.AoDigitar];
        celula.addEventListener('keydown', aoDigitar);
    }
    prepareMascaraEdicaoAceitaNulo(row, coluna, celula) {
        if (!coluna.ApenasNumerosAceitaNulo) return;

        const nome = 'data-mascara-apenas-numeros';
        const valor = "{\"mascara\": \"999999999999999999999999999999999999999999999999999\", \"retornaMascara\": false, \"aDireita\": false}";
        celula.setAttribute(nome, valor);
        celula.setAttribute('contenteditable', 'true');

        if (!row.mascara) row.mascara = [];
        row.mascara.push(coluna.Property);
        row.mascara[coluna.Property] = new Mascara(celula);

        const atualizeValor = ev => {
            eval(`row.${coluna.Property} = ev.target.textContent`);
            this._manipuladores.renderizacao.atualizeInputDatasource();
            if (!this._manipuladores.selecao) return;
            this._manipuladores.selecao.armazene();
        }

        celula.addEventListener('blur', atualizeValor);

        if (!coluna.AoDigitar) return;
        const aoDigitar = window[coluna.AoDigitar];
        celula.addEventListener('keydown', aoDigitar);
    }
    prepareColunaTextArea(row, coluna, celula) {
        let div = h("div", { class: "form-group form-textarea" });
        let textArea = h("textarea", { class: "form-control input-textarea" });
        if (coluna.ClassList) {
            textArea.classList['value'] += ' ' + coluna.ClassList;
        }
        atr(textArea, { id: `Coluna_${coluna.Property}_TextArea_${row.rowId}`, rows: coluna.QuantidadeLinhas, maxLength: coluna.MaxLength });
        textArea.innerHTML = row[coluna.Property] == 'undefined' || !row[coluna.Property] ? "" : row[coluna.Property];
        div.appendChild(textArea);
        celula.appendChild(div);
    }
    monteInnerHtml = (row, coluna, celula) => {
        if (coluna.Template) return this.obtenhaTemplate(row, coluna, celula);
        if (coluna.EhDropdown) return this.obtenhaDropdown(row, coluna, celula);
        if (coluna.EhCheckbox) return this.obtenhaCheckbox(row, coluna, celula);
        if (coluna.EhColunaTextArea) return this.prepareColunaTextArea(row, coluna, celula);

        this.obtenhaValor(row, coluna, celula);
    };
    obtenhaTemplate(row, coluna, container) {
        if (!coluna.Template.startsWith("#")) return;

        const idTemplate = coluna.Template.substr(1);
        const template = document.getElementById(idTemplate);

        const conteudo = template
            ? eval("`" + template.innerHTML + "`")
            : eval(coluna.Template);

        const range = document.createRange();
        const fragmento = range.createContextualFragment(conteudo);
        container.appendChild(fragmento);
    }
    obtenhaDropdown(row, coluna, container) {
        let dropdownDiv = document.createElement2('div', 'form-group mt-3 w-100 icon-dropdown');
        let dropdownSelect = document.createElement2('select', 'form-control form-select');
        let opcoes = row[coluna.Property].filter(value => value.Value !== "");
        let possuiSelecionado = opcoes.some(o => o.Selected);
        coluna.ItemDropDownNome && opcoes.unshift({ Value: '', Text: coluna.ItemDropDownNome, Selected: !possuiSelecionado })

        opcoes.forEach(opcao => {
            let dropdownOption = document.createElement('option');
            dropdownOption.setAttribute('value', opcao.Value);
            opcao.Selected && dropdownOption.setAttribute('selected', true);
            dropdownOption.innerText = opcao.Text;
            dropdownSelect.appendChild(dropdownOption);
        });

        dropdownSelect.addEventListener('change', ev => {
            opcoes.filter(i => i.Selected).forEach(i => i.Selected = false);
            opcoes.filter(i => i.Value === ev.target.value).forEach(i => i.Selected = true);
            this._manipuladores.renderizacao.bind();
        });

        dropdownDiv.appendChild(dropdownSelect);
        container.appendChild(dropdownDiv);
    }
    obtenhaCheckbox(row, coluna, celula) {
        const valorAtual = eval(`row.${coluna.Property}`);
        const classeEstadoAtual = valorAtual ? 'fa-check-square' : 'fa-square';

        const icone = document.createElement('i');
        icone.classList = 'fal ' + classeEstadoAtual;
        icone.style.pointerEvents = 'none';
        icone.type = 'checkbox';

        const atualizeValorCheckBox = ev => {
            const estaMarcado = icone.classList.contains('fa-check-square');
            const classeNovoEstado = estaMarcado ? 'fa-square' : 'fa-check-square';
            icone.classList = 'fal ' + classeNovoEstado;
            eval(`row.${coluna.Property} = ${!estaMarcado}`);
            this._manipuladores.renderizacao.atualizeInputDatasource();
        }

        if (window['atualizeValorCheckBox']) {
            window['atualizeValorCheckBox'].push({ Id: celula.id, Evento: atualizeValorCheckBox });
        } else {
            window['atualizeValorCheckBox'] = [{ Id: celula.id, Evento: atualizeValorCheckBox }];
        }


        celula.appendChild(icone);
        celula.classList.add('em-grid-cell-checkbox');
        celula.addEventListener('click', atualizeValorCheckBox);
    }
    obtenhaValor(row, coluna, container) {
        let valor;
        try { valor = eval(`row.${coluna.Property}`); } catch { }
        if (typeof valor === "boolean") {
            if (coluna.Property === "EstaAtivo") {

                if (valor) {
                    var icone = document.createElement2('i', 'fas fa-check-circle');
                    icone.setAttribute('style', 'font-weight:900 !important')
                    icone.style.color = 'var(--success)'

                }
                else {
                    var icone = document.createElement2('i', 'fas fa-times-circle');
                    icone.setAttribute('style', 'font-weight:900 !important')
                    icone.style.color = 'var(--danger)';
                }

                container.appendChild(icone);
                return;
            }
            valor = valor ? "Sim" : "Não";
        }
        const conteudo = document.createTextNode(valor || "");
        container.appendChild(conteudo);
    }

    crieAcoes(acoes, row, container) {
        if (!acoes) return;

        this._options.acoes.forEach(ac => {
            if (ac.Title == 'Editar' && container.classList.value === 'em-grid-cell d-flex ') {
                container.addEventListener('click', () => {
                    row.aggregator
                        ? this._manipuladores.datasource.marqueEditando({ aggregator: row.aggregator })
                        : this._manipuladores.datasource.marqueEditando({ rowId: row.rowId });
                    eval(ac.AoClicar + '(row)');
                });
            }
        });

        if (this._options.idPrefixado === 'GridAterrissagem' && container.classList.value === 'em-grid-cell d-flex ') {
            container.addEventListener('click', () => {
                formAterrissagem.edite(row);
            });
        }

        const ehAgrupamentoActions = this._options.ehAgrupamentoActions;
        const more = document.createElement2('div', 'more');
        const btnMore = document.createElement2('button', 'more-btn');
        const icone = document.createElement2('i', 'fal fa-ellipsis-v mr-2');
        btnMore.appendChild(icone);
        more.appendChild(btnMore);

        const moreMenu = document.createElement2('div', 'more-menu');
        const itens = document.createElement2('ul', 'more-menu-items');
        itens.setAttribute('aria-hidden', 'true');

        acoes.filter(a => { return a.ExibaSe }).map((action) => {

            let item = document.createElement2('li', 'more-menu-item');

            let botao = document.createElement2('button', action.Class ? `btn ${action.Class}` : 'btn');
            botao.setAttribute('type', 'button');
            if (action.DataRole) botao.setAttribute('data-role', action.DataRole);
            if (action.Title && action.Tooltip && !ehAgrupamentoActions) GridUtilidades.configureTooltip(botao, action.Title, action.Tooltip);
            if (action.DataRole === "em-grid-remover") this.crieActionRemover(row, action, botao);
            else if (action.DataRole === "em-grid-editar") this.crieActionEditar(row, action, botao);
            else if (action.DataRole === "em-grid-ativar") {
                this.crieActionAtivar(row, container);
                return;
            }
            else this.crieActionCustomizada(row, action, botao);
            botao.appendChild(this.crieActionIcone(action));
            if (this._options.ehAgrupamentoActions) {
                botao.innerHTML += `   ${action.Title}`;
            }
            item.appendChild(botao);
            itens.appendChild(item);
            moreMenu.appendChild(itens);
            more.appendChild(moreMenu);
            if (ehAgrupamentoActions) {
                container.appendChild(more);
            }
            else {
                container.appendChild(botao);
            }

        });


        let visible = false;

        function showMenu(e) {
            e.preventDefault();
            if (!visible) {
                visible = true;
                more.classList.add('show-more-menu');
                moreMenu.setAttribute('aria-hidden', false);
                crieBackDrop("transparent", 0, () => { hideMenu() });
            }
        }

        function hideMenu(e) {
            if (visible) {
                visible = false;
                more.classList.remove('show-more-menu');
                moreMenu.setAttribute('aria-hidden', true);
                document.removeEventListener('backbutton', hideMenu);
            }
        }

        btnMore.addEventListener('click', showMenu, false);
    };
    crieActionIcone(action) {
        return document.createElement2('i', action.Icon);
    }
    crieActionRemover(row, action, botao) {
        botao.onclick = (ev) => {
            if (!ev) return this.actionRemove(row, action, botao, true);

            if (ev == "RemovaSelecionados") {
                this.removaItensSelecionados(action);
                return;
            }
            ev.preventDefault();
            ev.stopPropagation();

            const yesCallback = ev => {
                this.actionRemove(row, action, botao);
            }
            const noCallback = () => this._manipuladores.datasource.desmarqueRemovendo();
            row.aggregator
                ? this._manipuladores.datasource.marqueRemovendo({ aggregator: row.aggregator })
                : this._manipuladores.datasource.marqueRemovendo({ rowId: row.rowId });
            new Modal().exclusao(yesCallback, noCallback).render();
        };
    }
    removaItensSelecionados(action) {
        if (JSON.parse(this._manipuladores.selecao._datasource.value).length) {
            const itensSelecionados = JSON.parse(this._manipuladores.selecao._datasource.value);

            const acaoExcluir = action.AoClicar;
            itensSelecionados.forEach(el => {
                this._manipuladores.datasource.remove(el);
                if (acaoExcluir) {
                    eval(`${acaoExcluir}(el)`);
                }
            });
            window[this._options.idPrefixado].bind();
            return;
        }
    }
    async actionRemove(row, action, botao, ehRemoveTodos) {
        if (!action.AoClicar) {
            if (ehRemoveTodos) {
                this._manipuladores.datasource.remove(row);

                if (!this._manipuladores.datasource.getData().length) {
                    window[this._options.idPrefixado].bind();
                }

                return;
            }

            this._manipuladores.datasource.remove(row);
            window[this._options.idPrefixado].bind();
            return;
        }

        if (this.ehFuncaoAssincrona(action)) {
            let rowId = row.rowId;
            this._options.itensSendoExcluidos[rowId] = {
                datasourceRow: row,
                gridRow: botao.closest(".em-grid-row")
            };

            let retorno = await eval(`${action.AoClicar}(row)`);

            if (retorno) {
                let grid = window[this._options.idPrefixado];
                grid.remove(this._options.itensSendoExcluidos[rowId].datasourceRow);
                this._options.itensSendoExcluidos[rowId].gridRow.remove();
            }

            return this._options.itensSendoExcluidos;
        }

        if (eval(`${action.AoClicar}(row)`) === true) {
            this._manipuladores.datasource.remove(row);
            window[this._options.idPrefixado].bind();
            botao.closest(".em-grid-row").remove();
        }
    };
    ehFuncaoAssincrona(action) {
        return eval(`${action.AoClicar}.constructor.name === "AsyncFunction"`);
    }
    crieActionEditar(row, action, botao) {
        botao.onclick = (ev) => {
            row.aggregator
                ? this._manipuladores.datasource.marqueEditando({ aggregator: row.aggregator })
                : this._manipuladores.datasource.marqueEditando({ rowId: row.rowId });
            if (action.AoClicar) eval(action.AoClicar + '(row)');
            ev.preventDefault();
        };
    }
    crieActionAtivar(row, container) {
        const botao = document.createElement2('button', 'btn');

        if (row.EstaAtivo) {
            botao.classList.add('btn-outline-danger');
            botao.setAttribute('data-role', 'em-grid-desativar');
            GridUtilidades.configureTooltip(botao, 'Desativar', 'tooltip-danger');

            botao.appendChild(document.createElement2('i', 'fal fa-check-square'));
        } else {
            botao.classList.add('btn-outline-success');
            botao.setAttribute('data-role', 'em-grid-ativar');
            GridUtilidades.configureTooltip(botao, 'Ativar', 'tooltip-success');

            botao.appendChild(document.createElement2('i', 'fal fa-square'));
        }

        container.appendChild(botao);

        botao.onclick = async ev => {
            ev.preventDefault();

            Modal.abraModalCarregamento();

            await formAterrissagem.ative(row);

            Modal.fecheModalCarregamento();

            this._manipuladores.renderizacao.bind();
        }
    }
    crieActionCustomizada(row, action, botao) {
        botao.onclick = (ev) => {
            ev.preventDefault();
            if (action.AoClicar) {
                eval(action.AoClicar + '(row)');
            }
        };
    }
}

class GridManipuladorOrdenacao {
    constructor(options, manipuladores, elementos) {
        this._options = options;
        this._manipuladores = manipuladores;
        this._elementos = elementos;
        this._crescente = true;
        this._colunaOrdenada = "";
        this._colunasOrdenadas = [];
        this._ordenacaoIndividual = true;
        this._ordenacaoDefinida = false;
        this._prepareOrdenacaoPadrao();
    }
    _prepareOrdenacaoPadrao() {
        const ordenacaoPadrao = this._options.ordenacaoPadrao;
        const ehCrescente = this._options.ordenacaoPadraoCrescente;
        ordenacaoPadrao && this.definaOrdenacao(ordenacaoPadrao);
        !ehCrescente && this.definaOrdenacao(ordenacaoPadrao);
    }
    crie(coluna) {
        let botaoTitulo = document.createElement2('button', 'btn btn-link');
        botaoTitulo.addEventListener('click', () => this.definaOrdenacao(coluna.PropertyOrdenacao || coluna.Property));
        let iconeOrdenar = document.createElement("i");
        iconeOrdenar.classList = this.obtenhaIconeOrdenacao(coluna.PropertyOrdenacao || coluna.Property)
        let tituloOrdenar = document.createTextNode(coluna.Title);
        botaoTitulo.appendChild(iconeOrdenar);
        botaoTitulo.appendChild(tituloOrdenar);
        return botaoTitulo;
    }
    obtenhaIconeOrdenacao(chave) {
        if (this._colunaOrdenada !== chave) return "fal fa-sort me-2";
        if (!this._crescente) return "fal fa-caret-up me-2";
        return "fal fa-caret-down me-2";
    }
    definaOrdenacao(chaves) {
        if (!chaves || !chaves.length) return;
        if (chaves && chaves.length == 1 || !Array.isArray(chaves)) {
            let chave = Array.isArray(chaves) ? chaves[0] : chaves;
            let estaOrdenandoOutraColuna = this._colunaOrdenada !== chave;
            let estaOrdenadoCrescente = this._crescente;
            let deveOrdenarCrescente = estaOrdenandoOutraColuna || !estaOrdenadoCrescente;
            if (deveOrdenarCrescente) this._crescente = true;
            else this._crescente = false;
            this._colunaOrdenada = chave;
            this._ordenacaoIndividual = true;
            this._colunasOrdenadas = [];
        } else {
            this._colunasOrdenadas = chaves;
            this._ordenacaoIndividual = false;
            this._colunaOrdenada = "";
            this._crescente = true;
        }
        this._ordenacaoDefinida = true;
    }
    ordene(datasource) {
        if (this._ordenacaoIndividual) {
            let coluna = this._colunaOrdenada.replace('.', '?.');
            let expressaoA = `a?.${coluna}`;
            let expressaoB = `b?.${coluna}`;
            let comparacao = (a, b) => compareParaOrdenar(eval(expressaoA), eval(expressaoB));
            let comparacaoDecrescente = (a, b) => compareParaOrdenarDecrescente(eval(expressaoA), eval(expressaoB));
            if (this._crescente) return datasource.sort(comparacao);
            return datasource.sort(comparacaoDecrescente);
        } else {
            let colunasOrdenadas = this._colunasOrdenadas;

            let expressao = "(a, b) => ";
            for (let i = 0; i < colunasOrdenadas.length; ++i) {
                let coluna = colunasOrdenadas[i].replace('.', '?.');
                expressao += `compareParaOrdenar(a?.${coluna}, b?.${coluna})`
                if (i < colunasOrdenadas.length - 1) {
                    expressao += " || ";
                }
            }

            let comparacao = eval(expressao);
            return datasource.sort(comparacao);
        }
    }
    getColunaOrdenada() {
        return this._colunaOrdenada;
    }
}

class GridManipuladorSelecao {
    constructor(options, manipuladores, elementos) {
        this._options = options;
        this._manipuladores = manipuladores;
        this._elementos = elementos;
        if (this._options.permiteMultiplaSelecao && this._options.permiteMultiplaExclusao) {
            this._manipuladores.manipuladorMultiplaExclusao = new GridManipuladorMultiplaExclusao(this._options, this._elementos);
        }
        this._elementos.container.appendChild(this.crieDatasource());
        this.armazene();
    }
    crieMultiplaExclusao(celula) {
        if (this._manipuladores.manipuladorMultiplaExclusao) this._manipuladores.manipuladorMultiplaExclusao.construa(celula);
    }
    crieDatasource() {
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('id', `${this._options.id}Selecionados`);
        input.setAttribute('name', `${this._options.id.replaceAll('_', '.')}Selecionados`);
        return this._datasource = input;
    }
    crieCheckboxHeader(row) {
        row.appendChild(this.crieCelula());
    }
    crieCheckboxBody(row) {
        row.appendChild(this.crieCelula(row));
    }
    crieCelula(row) {
        let classes = 'em-grid-cell em-grid-select-box';
        let celula = document.createElement2('div', classes);
        let msgTooltip = 'Selecionar registro';
        celula.appendChild(this.crieIcone());
        if (row) {
            celula.addEventListener('click', () => this.selecione(row));
        } else {
            celula.addEventListener('click', () => this.selecioneTodos());
            msgTooltip = 'Selecionar tudo';
        }
        GridUtilidades.configureTooltip(celula, msgTooltip, 'tooltip');
        return celula;
    }
    crieIcone() {
        let classes = 'fal fa-square';
        return document.createElement2('i', classes);
    }
    habilitaSelecao(row) {
        row.addEventListener('click', () => { this.limpe(); this.selecione(row); });
    }
    selecione(row) {
        this.invertaSelecao(row);
        this.armazene();
        this.mostreOculteMultiplaExclusao();
        if (this._options.permiteArrastar && this._options.permiteMultiplaSelecao && row.row.rowId != 0) {
            this.organizeElementosSelecionados();
        }
        if (!this._options.aoSelecionar) return;
        window[this._options.aoSelecionar](this.obtenha());
    }
    organizeElementosSelecionados() {

        let elementosDataSource = this._manipuladores.datasource._datasource;

        if (this._options.ehModelEnumerador) {
            this.organizeElementosSelecionadosModelEnumerador(elementosDataSource);
            return;
        }

        const elementosSelecionados = this.obtenha();

        for (let i = 0; i < elementosSelecionados.length; i++) {
            elementosDataSource = elementosDataSource.filter(el => { return el.rowId != elementosSelecionados[i].rowId });
        }
        this.ajusteControlesMultiplaSelecao(elementosSelecionados, elementosDataSource);
    }
    organizeElementosSelecionadosModelEnumerador(elementosDataSource) {
        const codigosElementosSelecionados = this.obtenha();
        let elementosSelecionados = [];

        for (let i = 0; i < codigosElementosSelecionados.length; i++) {
            elementosSelecionados.push(this._manipuladores.datasource._datasource.find(el => el.Codigo == codigosElementosSelecionados[i]));
        }

        for (let i = 0; i < elementosSelecionados.length; i++) {
            elementosDataSource = elementosDataSource.filter(el => { return el.Codigo != elementosSelecionados[i].Codigo });
        }
        this.ajusteControlesMultiplaSelecao(elementosSelecionados, elementosDataSource);
        return;
    }
    ajusteControlesMultiplaSelecao(elementosSelecionados, elementosDataSource) {
        this._manipuladores.datasource.clear();
        this._manipuladores.datasource._datasource = this._manipuladores.datasource._datasource.concat(elementosSelecionados);
        this._manipuladores.datasource._datasource = this._manipuladores.datasource._datasource.concat(elementosDataSource);
        this._manipuladores.renderizacao.bind(true);
    }
    selecioneTodos() {
        this.invertaSelecaoTodos();
        this.armazene();
        this.mostreOculteMultiplaExclusao();
        if (!this._options.aoSelecionar) return;
        window[this._options.aoSelecionar](this.obtenha());
    }
    selecionePrimeiro() {
        let linhaParaSelecionar = this._elementos.container.querySelector(".em-grid-body .em-grid-row");
        if (!linhaParaSelecionar) return;
        this.limpe();
        this.selecione(linhaParaSelecionar);
        this.ajusteScroll();
    }
    selecioneProximo() {
        let linhaSelecionada = this._elementos.container.querySelector(".em-grid-selected-row");
        let linhaParaSelecionar = linhaSelecionada && linhaSelecionada.nextElementSibling;
        if (!linhaParaSelecionar) return;
        this.limpe();
        this.selecione(linhaParaSelecionar);
        this.ajusteScroll();
    }
    selecioneAnterior() {
        let linhaSelecionada = this._elementos.container.querySelector(".em-grid-selected-row");
        let linhaParaSelecionar = linhaSelecionada && linhaSelecionada.previousElementSibling;
        if (!linhaParaSelecionar) return;
        this.limpe();
        this.selecione(linhaParaSelecionar);
        this.ajusteScroll();
    }
    limpe() {
        let selecionados = this._elementos.containerBody.querySelectorAll('.em-grid-selected-row');
        selecionados.forEach((row) => this.invertaSelecao(row));
        this.armazene();
    }
    obtenha() {
        return JSON.parse(this._datasource.value);
    }
    armazene() {
        if (!this._manipuladores.datasource) return this._datasource.value = JSON.stringify([]);
        let selecionados = this._manipuladores.datasource.getData().filter(row => row.selected);

        if (this._options.ehModelEnumerador) {
            selecionados = selecionados.reduce((arr, data) => { arr.push(data.Codigo); return arr; }, [])
        }

        this._datasource.value = JSON.stringify(selecionados);
    }
    mostreOculte(deveOcultar) {
        this._elementos.container.querySelectorAll('.em-grid-select-box i').forEach(i =>
            deveOcultar ? i.classList.add('d-none') : i.classList.remove('d-none'));
        this.mostreOculteMultiplaExclusao(deveOcultar);
    }
    mostreOculteMultiplaExclusao(deveOcultar) {
        this._manipuladores.manipuladorMultiplaExclusao
            && this._manipuladores.manipuladorMultiplaExclusao.mostreOculte(deveOcultar || this.obtenha().length === 0);
    }
    invertaSelecaoTodos() {
        let rows = this._elementos.containerBody.querySelectorAll('.em-grid-row');
        let allRowsSelected = rows.toArray().every(this.rowSelected);
        rows.forEach((row) => allRowsSelected ? this.invertaSelecao(row) : this.adicioneSelecao(row));
        this.altereCheckboxTodos();
    }
    invertaSelecao(row) {
        row.row.selected = !row.row.selected;
        row.classList.toggle('em-grid-selected-row');
        let icone = row.querySelector('.em-grid-select-box i');
        icone && this.invertaCheckbox(icone);
        this.altereCheckboxTodos();
    }
    marque(row) {
        row.classList.add('em-grid-selected-row');
        let icone = row.querySelector('.em-grid-select-box i');
        icone && this.invertaCheckbox(icone);
    }
    adicioneSelecao(row) {
        row.row.selected = true;
        !row.classList.contains('em-grid-selected-row')
            && row.classList.add('em-grid-selected-row');
        let icone = row.querySelector('.em-grid-select-box i');
        icone && this.adicioneSelecaoIcone(icone);
    }
    adicioneSelecaoIcone(icone) {
        icone.classList.remove('fa-square');
        icone.classList.add('fa-check-square');
    }
    invertaCheckbox(el) {
        let estaMarcado = el.classList.contains('fa-check-square');
        if (estaMarcado) {
            el.classList.remove('fa-check-square');
            el.classList.add('fa-square');
        } else {
            el.classList.remove('fa-square');
            el.classList.add('fa-check-square');
        }
    }
    rowSelected(el) {
        let icone = el.querySelector('.em-grid-select-box i');
        return icone && icone.classList.contains('fa-check-square');
    }
    altereCheckboxTodos() {
        let icone = this._elementos.containerHeader.querySelector('.em-grid-select-box i');
        if (!icone) return;
        let rows = this._elementos.containerBody.querySelectorAll('.em-grid-row');
        let anyRowsSelected = rows.toArray().filter(this.rowSelected);
        let allRowsSelected = !!rows.length && rows.length === anyRowsSelected.length;
        let someRowsSelected = !!rows.length && !allRowsSelected && anyRowsSelected.length;
        if (allRowsSelected) {
            icone.classList.remove('fa-square');
            icone.classList.remove('fa-minus-square');
            icone.classList.add('fa-check-square');
        } else if (someRowsSelected) {
            icone.classList.remove('fa-square');
            icone.classList.remove('fa-check-square');
            icone.classList.add('fa-minus-square');
        } else {
            icone.classList.remove('fa-minus-square');
            icone.classList.remove('fa-check-square');
            icone.classList.add('fa-square');
        }
    }
    ajusteScroll() {
        let linhasSelecionadas = this._elementos.container.querySelectorAll(".em-grid-selected-row");
        if (!linhasSelecionadas || linhasSelecionadas.length > 1) return;
        let linhaSelecionada = linhasSelecionadas[0];
        let linhaOffsetTop = linhaSelecionada.offsetTop - linhaSelecionada.parentElement.offsetTop;
        let linhaAltura = linhaSelecionada.offsetHeight;
        let linhaTotal = linhaOffsetTop + linhaAltura;
        let containerOffsetTop = this._elementos.containerBody.scrollTop;
        let containerAltura = this._elementos.containerBody.offsetHeight;
        let containerTotal = containerOffsetTop + containerAltura;
        if (containerTotal < linhaTotal) this._elementos.containerBody.scrollTop = linhaTotal - containerAltura;
        else if (linhaOffsetTop < containerOffsetTop) this._elementos.containerBody.scrollTop = linhaOffsetTop;
    }
}

class GridManipuladorMultiplaExclusao {
    constructor(options, elementos) {
        this._options = options;
        this._elementos = elementos;
    }
    construa(celula) {
        celula.appendChild(this.crieCelula());
    }
    crieCelula() {
        let classes = 'em-grid-cell em-grid-action d-flex';
        let celula = document.createElement2('div', classes);
        celula.appendChild(this.crieAction());
        return celula;
    }
    crieAction() {
        let classes = 'btn btn-outline-danger d-none p-0';
        let action = document.createElement2('button', classes);
        action.onclick = ev => { ev.preventDefault(); this.remova(ev); }
        GridUtilidades.configureTooltip(action, 'Remover todos os selecionados', 'tooltip-danger');
        action.appendChild(this.crieIcone());
        return this.action = action;
    }
    crieIcone() {
        let classes = 'fa fa-trash-alt';
        return document.createElement2('i', classes);
    }
    mostreOculte(deveOcultar) {
        deveOcultar
            ? this.action.classList.add('d-none')
            : this.action.classList.remove('d-none');
    }
    remova() {
        let yesCallback = () => {
            document.querySelector('.em-grid-action [data-role="em-grid-remover"]').onclick("RemovaSelecionados");
        }
        new Modal().exclusao(yesCallback).render();
    }
}

class GridManipuladorHighlight {
    constructor(options) {
        this._options = options;
        this._highlightsGerais = [];
        this._highlightsEspecificos = {};
        this._prepareGerais();
        this._prepareEspecificos();
    }
    _prepareGerais() {
        this._options.highlights
            .forEach(this.adicioneGeral.bind(this));
    }
    _prepareEspecificos() {
        const colunasComHighlights = this._options.colunas
            .filter(coluna => coluna.Highlights.length);

        const highlights = colunasComHighlights
            .flatMap(coluna => coluna.Highlights);

        highlights.forEach(this.adicioneEspecifico.bind(this));
    }
    adicioneGeral(highlight) {
        const highlightGeral = this._obtenhaHighlight(highlight);
        this._highlightsGerais.push(highlightGeral);
    }
    adicioneEspecifico(highlight) {
        highlight.Validacoes.forEach(validacao => {
            const prop = validacao.Propriedade;
            const highlightEspecifico = this._obtenhaHighlight(highlight);
            if (!this._highlightsEspecificos[prop]) this._highlightsEspecificos[prop] = [];
            this._highlightsEspecificos[prop].push(highlightEspecifico);
        });
    }
    _obtenhaHighlight(highlight) {
        const estilo = highlight.Estilo;
        const expressao = highlight.Validacoes
            .map(this._obtenhaExpressao)
            .join(' && ');

        return { expressao, estilo };
    }
    _obtenhaExpressao(highlight) {
        const chave = highlight.PropriedadeOverride || highlight.Propriedade;
        const valor = highlight.Valor;
        const tipoValor = highlight.TipoValor;
        const operador = highlight.Operador;

        switch (tipoValor) {
            case 'date': return `new Date(row.${chave}).getTime() ${operador} new Date(${valor.toLowerCase()}).getTime()`;
            case 'string': return `String(row.${chave}).toLowerCase() ${operador} "${valor.toLowerCase()}"`;
        }
    }
    obtenhaEstiloGeral(row) {
        const highlight = this._highlightsGerais
            .find(high => this._ehValido(row, high));

        return highlight ? highlight.estilo : '';
    }
    obtenhaEstiloEspecifico(row, propriedade) {
        const highlight = this._highlightsEspecificos[propriedade];
        if (!highlight) return '';
        const highlightValido = highlight.find(hl => this._ehValido(row, hl));
        return highlightValido ? 'highlight ' + highlightValido.estilo : '';
    }
    _ehValido(row, highlight) {
        try { return eval(highlight.expressao) }
        catch { return false }
    }
    limpe() {
        this._highlightsGerais = [];
    }
}

class GridManipuladorDrag {
    constructor(options, manipuladores, elementos) {
        this._options = options;
        this._manipuladores = manipuladores;
        this._elementos = elementos;
    }
    prepare() {
        this._createActions();
        this._prepareDocumentEvents();
    }
    _createActions() {
        const header = this._elementos.containerHeader
        const headerRow = header.querySelector('.em-grid-row');
        this._createHeaderAction(headerRow);

        const body = this._elementos.containerBody;
        const bodyRows = body.querySelectorAll('.em-grid-row');
        bodyRows.forEach(this._createBodyAction.bind(this));
    }
    _createHeaderAction(row) {
        const classes = 'em-grid-cell em-grid-cell-drag';
        const cell = document.createElement2('div', classes);
        row.insertBefore(cell, row.firstChild);
    }
    _createBodyAction(row) {
        const classes = 'fas fa-grip-vertical em-grid-action-drag';
        const action = document.createElement2('i', classes);

        const cell = document.createElement2('div', 'em-grid-cell em-grid-cell-drag');
        cell.appendChild(action);

        row.insertBefore(cell, row.firstChild);
        this._addEventListener(row, cell);
    }
    _addEventListener(row, action) {
        const start = this._start.bind(this);
        const move = this._move.bind(this);
        action.addEventListener('mousedown', start);
        row.addEventListener('mousemove', move);
    }
    _prepareDocumentEvents() {
        const end = this._end.bind(this);
        const redraw = this._redraw.bind(this);
        document.addEventListener('mouseup', end);
        document.addEventListener('mousemove', redraw);
    }
    _start(ev) {
        const action = ev.currentTarget;
        const rowOriginal = action.closest('.em-grid-row');
        const rowClone = this._createClone(rowOriginal);
        const rowContainer = rowOriginal.closest('.em-grid-body');
        const cloneContainer = this._createCloneContainer(rowClone);

        this._makeContainerDraggable(rowContainer, cloneContainer);
        this._handler = { clone: rowClone, container: rowContainer }

        const rowMiddle = rowOriginal.offsetHeight / 2;
        const mouseOffsetY = ev.offsetY;
        const isBefore = rowMiddle > mouseOffsetY;
        this._drawDropRegion(rowContainer, rowOriginal, isBefore);

        rowOriginal.remove();
        this._redraw(ev);
    }
    _createClone(obj) {
        const clone = obj.cloneNode(true);
        const width = obj.offsetWidth;

        clone.classList.add('em-grid-dragging');
        clone.classList.add('success');
        clone.style.width = `${width}px`;
        clone.row = obj.row;
        return clone;
    }
    _createCloneContainer(clone) {
        const classes = 'em-grid-dragging-container';
        const container = document.createElement2('div', classes);
        container.appendChild(clone);
        return container;
    }
    _makeContainerDraggable(rowContainer, cloneContainer) {
        const gridContainer = rowContainer.closest('.em-grid-container');
        gridContainer.classList.add('dragging');
        document.body.classList.add('dragging');
        rowContainer.appendChild(cloneContainer);
    }
    _redraw(ev) {
        if (!this._handler) return;

        ev.preventDefault();
        ev.stopPropagation();

        const mouseY = ev.y;
        const rowClone = this._handler.clone;
        const rowMiddle = rowClone.offsetHeight / 2;
        const top = `${mouseY - rowMiddle}px`;

        rowClone.style.top = top;
    }
    _end(ev) {
        if (!this._handler) return;

        const handler = this._handler;
        const rowClone = handler.clone;
        const rowContainer = handler.container;

        rowClone.remove();
        rowContainer.classList.remove('dragging');

        document.body.style.cursor = null;

        const target = this._handler.target;
        const fromIndex = this._handler.clone.row.rowId;
        const toIndex = fromIndex < target ? target - 1 : target;
        const handlers = this._manipuladores;

        if (fromIndex !== toIndex) {
            const datasource = handlers.datasource;
            const data = datasource.getData();
            const indexes = [fromIndex, toIndex];

            data.move(...indexes);
            this._callback(rowClone.row, ...indexes);
        }

        const render = handlers.renderizacao;
        render.bind(true);

        delete this._handler;
        this._unmakeContainerDraggable(rowContainer);
    }
    _unmakeContainerDraggable(rowContainer) {
        const gridContainer = rowContainer.closest('.em-grid-container');
        gridContainer.classList.remove('dragging');
        document.body.classList.remove('dragging');
    }
    _callback() {
        const onDrag = this._options.aoArrastar;
        const func = window[onDrag];
        if (func) func(...arguments);
    }
    _move(ev) {
        if (!this._handler) return;

        const target = ev.currentTarget;
        const parent = target.parentNode;
        const middle = target.offsetHeight / 2;
        const offset = ev.offsetY;
        const isBefore = middle > offset;

        this._removeDropRegion();
        this._drawDropRegion(parent, target, isBefore);
    }
    _drawDropRegion(parent, target, isBefore) {
        const targetId = target.row.rowId;
        const dropRegion = this._createDropRegion();

        const handler = this._handler;
        const rowClone = handler.clone;
        const rowCloneId = rowClone.row.rowId;

        const node = isBefore ? target : target.nextSibling;
        parent.insertBefore(dropRegion, node);

        const getTargetId = () => {
            if (!isBefore) return targetId + 1;
            const positionChanged = targetId !== rowCloneId;
            return positionChanged ? targetId : rowCloneId;
        }

        handler.target = getTargetId();
    }
    _createDropRegion() {
        const classes = 'em-grid-drop-region em-grid-row success';
        const dropRegion = document.createElement2('div', classes);

        const clone = this._handler.clone;
        const height = clone.offsetHeight;
        dropRegion.style.height = `${height}px`;

        const handler = this._handler;
        handler.dropRegion = dropRegion;

        return dropRegion;
    }
    _removeDropRegion() {
        const handler = this._handler;
        const dropRegion = handler.dropRegion;
        dropRegion.remove();
    }
}
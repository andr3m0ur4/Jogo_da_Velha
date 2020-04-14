var rodada = 1
var matriz_jogo = Array(3)

matriz_jogo['a'] = Array(3)
matriz_jogo['b'] = Array(3)
matriz_jogo['c'] = Array(3)

for (var i = 1; i <= 3; i++) {
	matriz_jogo['a'][i] = 0
	matriz_jogo['b'][i] = 0
	matriz_jogo['c'][i] = 0
}

$(document).ready(function() {

	$('#btn_iniciar_jogo').click(function() {

		// valida a digitação dos apelidos dos jogadores
		if (!($('#entrada_apelido_jogador_1').val())) {
			alert('Apelido do jogador 1 não foi preenchido!')
			return false
		}

		if (!($('#entrada_apelido_jogador_2').val())) {
			alert('Apelido do jogador 2 não foi preenchido!')
			return false
		}
		
		// exibir os apelidos
		$('#nome_jogador_1').html($('#entrada_apelido_jogador_1').val())
		$('#nome_jogador_2').html($('#entrada_apelido_jogador_2').val())

		// controle das visualizações das divs
		$('#pagina_inicial').hide()
		$('#palco_jogo').show()

	})

	$('.jogada').click(function() {

		var id_campo_clicado = this.id
		jogada(id_campo_clicado)
	})

	function jogada(id) {
		var icone = ''
		var ponto = 0

		if ((rodada % 2) === 1) {
			icone = 'url("./imagens/marcacao_1.png")'
			ponto = -1
		} else {
			icone = 'url("./imagens/marcacao_2.png")'
			ponto = 1
		}

		rodada++

		$('#' + id).css('background-image', icone)

		var linha_coluna = id.split('-')

		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto

		verificarCombinacao()
	}

	function verificarCombinacao() {

		// verificar na horizontal
		var pontos = 0
		for (var i = 1; i <= 3; i++) {
			pontos += matriz_jogo['a'][i]
		}

		ganhador(pontos)
		pontos = 0

		for (var i = 1; i <= 3; i++) {
			pontos += matriz_jogo['b'][i]
		}

		ganhador(pontos)
		pontos = 0

		for (var i = 1; i <= 3; i++) {
			pontos += matriz_jogo['c'][i]
		}

		// verificar na vertical
		pontos = 0
		for (var i = 1; i <= 3; i++) {
			pontos = 0
			pontos += matriz_jogo['a'][i]
			pontos += matriz_jogo['b'][i]
			pontos += matriz_jogo['c'][i]

			ganhador(pontos)
		}

		// verificar na diagonal
		pontos = 0
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3]
		ganhador(pontos)

		pontos = 0
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1]
		ganhador(pontos)
	}

	function ganhador(pontos) {

		if (pontos === -3) {

			var jogador_1 = $('#entrada_apelido_jogador_1').val()
			alert(`${jogador_1} é o vencedor`)
			$('.jogada').off()

		} else if (pontos === 3) {

			var jogador_2 = $('#entrada_apelido_jogador_2').val()
			alert(`${jogador_2} é o vencedor`)
			$('.jogada').off()
			
		}
	}

})

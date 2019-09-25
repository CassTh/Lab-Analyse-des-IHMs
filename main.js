	$(document).ready(function(){
		$("#output").hide(); 
	});

	function panel(el, show, hide) {
		if(	show =='inputs'){
			// mets en gras l'onglet sélectionné
			$('#link_inputs').css('font-weight','bold');
			$('#link_output').css('font-weight',''); 
			// cacher la div output
			$("#output").hide(); 
			// afficher la div inputs
			$("#inputs").show();
		}else if(show == 'output'){
			// mets en gras l'onglet sélectionné
			$('#link_inputs').css('font-weight','');
			$('#link_output').css('font-weight','bold');
			// cacher la div inputs
			$("#inputs").hide(); 
			// afficher la div output
			$("#output").show();
		}
	}
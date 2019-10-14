/*Fichier JS de l'application du Lab 2
Déclaration des procédures du site web
Auteurs : 	WITTY Julien - 1949837
			THOLOT Cassandre - 2035978
Date de création : 4/09/19
Date de dernière modification : 14/10/19
*/	

/*Attribution des events listeners aux objects*/	
	window.onloadstart = function(){
		//Ajout des eventsListeners sur les selects
		var selectors = document.getElementsByName("select");
		for ( var i=0; i<selectors.length; i++){
			selectors.item(i).addEventListener("change", updateOutputTable());
		}
	};

/*Initialisation des outputs*/
	$(document).ready(function(){
		//Chargement de l'image des outputs		
		setTableImage();
		//Affichage par défaut sur la page input
		$('#img_output').hide();
		$("#output").hide();
	});
	
/* toggleInputsOutputVisibility(show) : Fonction d'affichage/masquage
des inputs et outputs avec mise en gras du lien sélectionné.
Paramètres :	show le nom de la page à afficher et du lien à mettre en évidence
Retour : 		void
*/ 
	function toggleInputsOutputVisibility(show) {
		if(	show =='inputs'){
			// mets en gras l'onglet sélectionné
			$('#link_inputs').css('font-weight','bold');
			$('#link_output').css('font-weight',''); 
			// cacher la div output ou l'img output
			if( $('#output').is(':empty') ) {
				$('#img_output').hide();
			}else{
				$("#output").hide();
			}
			
			// afficher la div inputs
			$("#inputs").show();
		}else if(show == 'output'){
			// mets en gras l'onglet sélectionné
			$('#link_inputs').css('font-weight','');
			$('#link_output').css('font-weight','bold');
			// cacher la div inputs
			$("#inputs").hide(); 
			// afficher la div output ou l'img output
			if( $('#output').is(':empty') ) {
				$('#img_output').show();
			}else{
				$("#output").show();
			}
		}
	}

/* updateOutputTable() : Fonction qui appelle la création du tableau
des outputs et masque l'image précédente. 
Paramètres :	aucun
Retour : 		void
*/ 
	function updateOutputTable(){
		var url = 'http://localhost:8080/JSON/data.json';
		createOutputTable(url);
		//Hide output image
		$('#img_output').hide();
	}	

/* createOutputTable(url) : Fonction qui requête le JSON
à l'URL passée en paramêtre, fait les vérifications et le 
contrôle d'erreur et appelle la création du tableau à partir
des données en JSON.
Paramètres :	url l'adresse du fichier JSON à requêter
Retour : 		void
*/ 
	function createOutputTable(url){
		fetch(url)
			.then(
				function(response) {
					if (response.status !== 200) {
						console.log('Looks like there was a problem. Status Code: ' + response.status);
						return;
					}
					// Examine the text in the response
					response.json().then(function(data) {
						console.log(data);
						generatebleTableFromJSON(data);
					});
				}
			)
			.catch(function(err) {
				console.log('Fetch Error :-S', err);
			});
	};

/* generatebleTableFromJSON(json) : Fonction qui génère le tableau
de données en HTML (formatté avec Bootstrap) à partir de l'objet JSON
en paramètre.
Paramètres :	json le json des données du tableau
Retour : 		void
*/ 
	function generatebleTableFromJSON(json){
		//En-têtes du tableau HTML
		var HTMLTable 	= "<div class=\"container\"><div class=\"row\"><div class=\"col-4\">&#160;</div><div class=\"col-4\">Recontract</div>"
						+"<div class=\"col-4\">New Customers</div></div><div class=\"row\"><div class=\"col-4\">&#160;</div>"
						+"<div class=\"col-2\">Baseline</div><div class=\"col-2\">Scénario</div><div class=\"col-2\">Baseline</div>"
						+"<div class=\"col-2\">Scénario</div></div><div class=\"row\"><div class=\"col-3\">&#160;</div>"
						+"<div class=\"col-1\">Population</div><div class=\"col-1\">Volume</div><div class=\"col-1\">ARPU</div>"
						+"<div class=\"col-1\">Volume</div><div class=\"col-1\">ARPU</div><div class=\"col-1\">Volume</div>"
						+"<div class=\"col-1\">ARPU</div><div class=\"col-1\">Volume</div><div class=\"col-1\">ARPU</div></div>";
		//Compteur de blocs pour reccupérer le nom de chaque bloc
		var i = 0;
		for (var bloc in json){
			//Bloc représente les 2 blocs du tableau et du JSON
			//Reccuperation de la clef du bloc
			var bloc_names = Object.keys(json);
			//En-tête du bloc avec la clef comme nom
			HTMLTable 	+= "<div class=\"row\"><div class=\"bloc col-4\">"
						+ bloc_names[i].replace("."," ")
						+"</div><div class=\"col-8\">&#160;</div></div>";
			for (var line in json[bloc]){
				//Line représente les lignes du tableau
				HTMLTable += "<div class=\"row\"><div class=\"col-1\">&#160;</div><div class=\"col-2\">";
				for (var cell in json[bloc][line]){
					//Cell représente les cellules du tableau
					//Reccuperation de la cellule
					var data_cell = json[bloc][line][cell];
					HTMLTable 	+= data_cell
								+ "</div><div class=\"col-1\">";
				}
				//Fermeture de la dernière cellule du tableau
				HTMLTable += "</div>";
				//Fermeture de la ligne du tableau
				HTMLTable += "</div>";
			}	
			//Avancée du compteur de blocs
			i++;		
		}
		//Fermeture du contenant du tableau
		HTMLTable += "</div>";
		//Ajout du tableau à la page HTML
		document.getElementById('output').innerHTML = HTMLTable;
		
	};
	
/* setTableImage() : Fonction qui appelle l'affichage de
l'image des outputs (affichée avant la création du tableau
uniquement).
Paramètres :	aucun
Retour : 		void
*/ 	
	function setTableImage(){
		var url = 'http://localhost:8080/Images/fig3.png';
		getImage(url);
	}

/* getImage(url) : Fonction qui requête l'image
à l'URL passée en paramêtre, fait les vérifications et le 
contrôle d'erreur et affiche l'image.
Paramètres :	url l'adresse de l'image à requêter
Retour : 		void
*/ 
	function getImage(url){
		fetch(url)
			.then(
				function(response) {
					if (response.status !== 200) {
						console.log('Looks like there was a problem. Status Code: ' + response.status);
						return;
					}
					// Examine the image in the response
					response.blob().then(function(data) {
						var urlCreator = window.URL || window.webkitURL;
						var imageUrl = urlCreator.createObjectURL(data);
						document.querySelector("#img_output").src = imageUrl;
					});
				}
			)
			.catch(function(err) {
				console.log('Fetch Error :-S', err);
			});
	};
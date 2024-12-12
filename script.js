const gamesList = [
	{
		title: "La rose",
		year: 2017,
		imageUrl:
			"https://img.freepik.com/photos-gratuite/belle-rose-studio_23-2150894289.jpg",
		id: 1,
	},
	{
		title: "Lycoris Radiata",
		year: 2009,
		imageUrl:
			"https://cdn.shopify.com/s/files/1/0558/6400/0586/files/lycoris-radiata-japan-mood_480x480.jpg?v=1701182709",
		id: 2,
	},
	{
		title: "Dahlia",
		year: 2022,
		imageUrl:
			"https://fleurs-etc.com/wp-content/uploads/2018/10/ezgif-2-26b27e03b633.jpg",
		id: 3,
	},
	{
		title: "Marguerite",
		year: 2018,
		imageUrl:
			"https://www.leparisien.fr/resizer/HOmPRuHyvwt3p3VeU3gsLFjpp9U=/932x582/cloudfront-eu-central-1.images.arcpublishing.com/lpguideshopping/XKP4LP6565H5ZDBRMINZRA4DSQ.jpg",
		id: 4,
	},
	{
		title: "Tournesol",
		year: 2004,
		imageUrl:
			"https://jardinage.lemonde.fr/images/dossiers/historique/tournesol-175148.jpg",
		id: 5,
	},
	{
		title: "Iris",
		year: 2011,
		imageUrl:
			"https://static.aujardin.info/cache/th/par/iris-unguicularis-600x450.webp",
		id: 6,
	},
];

function writeDom() {
	gamesList.forEach((game) => {
		const articleContainer = document.querySelector(".row");
		articleContainer.innerHTML += `<article class="col">
							<div class="card shadow-sm">
								<img src="${game.imageUrl}" alt="${game.title}" class="card-img-top" />

								<div class="card-body">
									<h3 class="card-title">${game.title}</h3>
									<p class="card-text">
										${game.year}
									</p>
									<div
										class="d-flex justify-content-between align-items-center"
									>
										<div class="btn-group">
											<button
												type="button"
												class="btn btn-sm btn-outline-secondary view"
												data-bs-toggle="modal" data-bs-target="#exampleModal"
												data-view-id="${game.id}"
											>
												View
											</button>
											<button
												type="button"
												class="btn btn-sm btn-outline-secondary edit"
												data-bs-toggle="modal" data-bs-target="#exampleModal"
												data-edit-id="${game.id}"
											>
												Edit
											</button>
										</div>
									</div>
								</div>
							</div>
						</article>`;
	});
}

writeDom();

// Gestion des boutons Edit
let editButtons = document.querySelectorAll(".edit");
editButtons.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		editModal(e.target.getAttribute("data-edit-id"));
	});
});

// Gestion des boutons View
let viewButtons = document.querySelectorAll(".view");
viewButtons.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		viewModal(e.target.getAttribute("data-view-id"));
	});
});


function modifyModal(modalTitle, modalBody) {
	// Écrire le nom du jeu dans le titre du modal
	document.querySelector(".modal-title").textContent = modalTitle
	// Écrire dans le corps du modal
	document.querySelector(".modal-body").innerHTML = modalBody
	// Écrire dans le footer
	document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>
		<button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
</form>`
}
function viewModal(gameId) {
	// console.log(gameId, gamesList)
	// Trouvez le jeu en fonction de son identifiant
	const result = gamesList.findIndex((game) => game.id === parseInt(gameId))
	// passer une image comme corps du modal
	const modalBody = `<img src="${gamesList[result].imageUrl}" alt="${gamesList[result].title}" class="img-fluid" />`
	modifyModal(gamesList[result].title, modalBody)
	// edit footer
	// Écrire dans le footer
	document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>
</form>`
}
function editModal(gameId) {
	// Trouvez le jeu en fonction de son identifiant
	const result = gamesList.findIndex((game) => game.id === parseInt(gameId))
	// Injectez le formulaire dans le corps du modal
	fetch("./form.html").then((data) => {
		data.text().then((form) => {
			// Modifiez le titre et le corps du modal
			const selectedGame = gamesList[result]
			modifyModal("Mode Edition", form)
			modifyFom({
				title: selectedGame.title,
				year: selectedGame.year,
				imageUrl: selectedGame.imageUrl,
			})
			document
			.querySelector('button[type="submit"]')
			.addEventListener("click", () => updateGames(title.value, year.value, imageUrl.value, gameId))
		})

	})
}
function modifyFom(gameData) {
	const form = document.querySelector("form")
	form.title.value = gameData.title
	form.year.value = gameData.year
	form.imageUrl.value = gameData.imageUrl
}
function updateGames(title, year, imageUrl, gameId) {
	console.log(gameId);

	// Trouvez le jeu en fonction de son identifiant
	const index = gamesList.findIndex((game) => game.id === parseInt(gameId))

	gamesList[index].title = title
	gamesList[index].year = year
	gamesList[index].imageUrl = imageUrl
	document.querySelector(".row").innerHTML = "" // Nous supprimons toutes les données des jeux dans le DOM.
	writeDom()
	editButtons = document.querySelectorAll(".edit")
	editButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			editModal(e.target.getAttribute("data-edit-id"))
		})
	})
	viewButtons = document.querySelectorAll(".view")
	viewButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			viewModal(e.target.getAttribute("data-edit-id"))
		})
	})
}
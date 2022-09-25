document.querySelector('#convertAndDownload').addEventListener('click', convertAndDownload)

async function convertAndDownload() {
	let listName = document.querySelector('#listName').value
	let cardTitles = getArrayFromInput('cardTitles')
	let passwords = getArrayFromInput('passwords')
	let allowedCopies = getArrayFromInput('allowedCopies')

	//if any of the arrays or listName is empty, return
	if (cardTitles.length <= 1 || passwords.length <= 1 || allowedCopies.length <= 1 || listName == '') {
		alert('Please fill out all fields')
		return
	}

	//check if all 3 arrays have the same length, if not, alert the user
	if (cardTitles.length !== passwords.length || cardTitles.length !== allowedCopies.length) {
		alert('The amount of card titles, passwords and allowed copies must be the same')
		return
	}

	let customList = []
	customList.push(`#[_${listName}]`)
	customList.push(`!_${listName}`)
	customList.push('$whitelist')
	for (let i = 0; i < cardTitles.length; i++) {
		//if the card wasn't released yet, don't add it to the list
		if (allowedCopies[i] == '') continue
		let newEntry = `${passwords[i]} ${allowedCopies[i]} --${cardTitles[i]}`
		customList.push(newEntry)
	}
	console.log(customList)

	//download the array as a .txt file
	let blob = new Blob([customList.join('\n')], { type: 'text/plain' })
	let link = document.createElement('a')
	link.href = window.URL.createObjectURL(blob)
	link.download = `00_${listName}.lflist.conf`
	link.click()
	
}

function getArrayFromInput(fieldID) {
	let data = document.querySelector('#' + fieldID).value
	data = data.split('\n')
	//if 1st row is 'password', 'passwordPreErrata' or 'title' or contains 'January', 'February',etc. then delete it, because it's the header
	if (
		data[0] === 'password' ||
		data[0] === 'passwordPreErrata' ||
		data[0] === 'title' ||
		data[0].includes('January') ||
		data[0].includes('February') ||
		data[0].includes('March') ||
		data[0].includes('April') ||
		data[0].includes('May') ||
		data[0].includes('June') ||
		data[0].includes('July') ||
		data[0].includes('August') ||
		data[0].includes('September') ||
		data[0].includes('October') ||
		data[0].includes('November') ||
		data[0].includes('December')
	) {
		data.shift()
	}

	return data
}

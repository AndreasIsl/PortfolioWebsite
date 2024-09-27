
    
document.addEventListener('DOMContentLoaded', () => {
    console.log("domcontent is loaded");
    
    let filteredTags = [];
    const tagsContainer = document.querySelector('.tags'); // Der Container der Tags
    const tags = document.querySelectorAll('.tag'); // Alle Tag-Elemente
    const projects = document.querySelectorAll('.project-item'); // Alle Projekt-Elemente    
    const form = document.querySelector('.search-form');
    const input = form?.querySelector('.search-input') ;
    const button = document.querySelector('.clearTagsBtn');
    const activeTags = Array.from(document.querySelectorAll('.tag.active')); // Active Tags


    // Function to filter tags
    function filterProjects() {
        // Look at every project
        projects.forEach((project) => {
        const projectElement = project ;
        const projectTags = projectElement.dataset.tags?.split(',') || []; // Tags des Projekts
        // Look if a project has any active tags
        const hasActiveTag = filteredTags.some(tag => projectTags.includes(tag));
    
        // Display or hide tags
        if (filteredTags.length === 0 || hasActiveTag) {
            projectElement.style.display = 'flex'; // show project  
        } else {
            projectElement.style.display = 'none'; // 
                project 
        }
        });
    }

    // Event-Listener für jedes Tag hinzufügen
    tags.forEach(tag => {
        tag.addEventListener('click', (e) => {
        const clickedTag = e.target;
        console.log("click");
        
        // Toggle the "active" class
        clickedTag.classList.toggle('active');

        //If tag is active move it to the front
        if (clickedTag.classList.contains('active')) {
            tagsContainer.prepend(clickedTag); 
            filteredTags.push(clickedTag.innerText );
        } else {
            tagsContainer.append(clickedTag); 
            const index = filteredTags.indexOf(clickedTag.innerText);
            filteredTags.splice(index,1);
        }

        // After every change
        filterProjects();
        });
    });
    
    //Initial filtering
    filterProjects();

    //------ClearTagsButton-------
    console.log(button);

    button.onclick = function() {
        activeTags.forEach((tag) =>{
            tag.classList.toggle('active');
            tagsContainer.append(tag); // Ans Ende verschieben
            const index = filteredTags.indexOf(tag);
            filteredTags.splice(index,1);
        })

        projects.forEach((project) => {
        const projectElement = project;
            projectElement.style.display = 'flex'; // Projekt anzeigen
        }
    )   
}

//search-form
input.addEventListener('input', () => { 
    const searchText = input.value.trim();
    
    if (!searchText) {  
        return;
    }

    projects.forEach((project) => {
        const projectElement = project;
        const title = project.getAttribute('data-title') || "";
        const description = project.getAttribute('data-description') || "";
        const titleElement = project.querySelector('.project-title');
        const descriptionElement = project.querySelector('.project-description');
            // Prüfe, ob der Suchtext im Titel oder in der Beschreibung enthalten ist

            if(titleElement == null){
                console.log("titleElement is null or undefined");
            }
            if(descriptionElement == null){
                console.log("descriptionElement is null or undefined");
            }
            if(title == null){
                console.log("title is null or undefined");
            }
            if(description == null){
                console.log("description is null or undefined");
            }

        if (title.toLowerCase().includes(searchText.toLowerCase()) || 
            description.toLowerCase().includes(searchText.toLowerCase())) {

            //replace the text trough the regex doesent work TODO
            const regex = new RegExp(searchText, 'gi');
            const highlightedTitle = title.replace(regex, (match) => `<span class="highlight">${match}</span>`);
            const highlightedDescription = description.replace(regex, (match) => `<span class="highlight">${match}</span>`);

            // Hier setze sicher, dass `innerHTML` verwendet wird, um HTML zu interpretieren.
            /*titleElement!.innerHTML = highlightedTitle;
            descriptionElement!.innerHTML = highlightedDescription;*/

            // Stelle sicher, dass das Projekt sichtbar bleibt
            projectElement.style.display = 'flex';
        } else {
            // Verstecke das Projekt, wenn der Text nicht passt
            projectElement.style.display = 'none';
        }
        });
    });

});

var html = `
      ${a.map(e => `
        <input type="radio" name="episodeToggle" id="episodeToggle${e.number}"/>
        <label class="episode" for="episodeToggle${e.number}">
          <div class="thumbnail">
            <img src='images/${e.number}.jpg'/>
          </div>
          <div>
            <span class="number">#${e.number}</span>:
            <span class="title">${e.title}</span>
          </div>
          <div class="description">${e.description}</div>
        </label>
      `).join('')}`;

document.querySelector(".list").innerHTML = html;

// Football Hub JS - renders demo data and basic interactions
(async function(){
  const page = document.body.dataset.page || 'home';
  const res = await fetch('./assets/data.json');
  const data = await res.json();

  // Home KPIs
  if(page === 'home') {
    document.getElementById('kpiMatches').textContent = data.stats.matches;
    document.getElementById('kpiGoals').textContent = data.stats.avgGoals.toFixed(1);

    // League snapshot
    const tbody = document.querySelector('#tableLeague tbody');
    data.league.slice(0,5).forEach((row, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${i+1}</td><td>${row.team}</td><td>${row.pts}</td><td>${row.gd}</td>`;
      tbody.appendChild(tr);
    });

    // Upcoming fixtures
    const fxWrap = document.getElementById('fixtureList');
    data.fixtures.forEach(f => {
      const card = document.createElement('div');
      card.className = 'kpi';
      card.innerHTML = `<div class="num" style="min-width:70px">${new Date(f.date).toLocaleDateString([], {month:'short', day:'2-digit'})}</div>
        <div><div><strong>${f.home}</strong> vs <strong>${f.away}</strong></div>
        <small>${f.competition} · ${f.time}</small></div>`;
      fxWrap.appendChild(card);
    });

    // Scorers
    const scorersBody = document.querySelector('#tableScorers tbody');
    data.scorers.forEach(s => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${s.player}</td><td>${s.team}</td><td>${s.goals}</td>`;
      scorersBody.appendChild(tr);
    });
  }

  // Fixtures page
  if(page === 'fixtures'){
    const input = document.getElementById('searchFixtures');
    const list = document.getElementById('fixturesContainer');

    function render(filter=''){
      list.innerHTML = '';
      const q = filter.toLowerCase();
      data.fixtures
        .filter(f => `${f.home} ${f.away} ${f.competition}`.toLowerCase().includes(q))
        .forEach(f => {
          const div = document.createElement('div');
          div.className = 'card';
          div.innerHTML = `
            <div class="card-header">
              <h3>${f.home} vs ${f.away}</h3>
              <span class="badge">${f.competition}</span>
            </div>
            <div class="card-body">
              <div><strong>Date:</strong> ${new Date(f.date).toLocaleDateString()}</div>
              <div><strong>Kickoff:</strong> ${f.time}</div>
            </div>`;
          list.appendChild(div);
        });
    }
    input.addEventListener('input', e => render(e.target.value));
    render();
  }

  // Teams page
  if(page === 'teams'){
    const tbody = document.querySelector('#teamsTable tbody');
    const input = document.getElementById('searchTeams');
    function render(filter=''){
      tbody.innerHTML='';
      const rows = data.league
        .filter(r => r.team.toLowerCase().includes(filter.toLowerCase()))
        .sort((a,b)=> b.pts - a.pts || b.gd - a.gd);
      rows.forEach((r, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${i+1}</td><td>${r.team}</td><td>${r.played}</td>
                        <td>${r.w}</td><td>${r.d}</td><td>${r.l}</td><td>${r.gd}</td><td>${r.pts}</td>`;
        tbody.appendChild(tr);
      });
    }
    input.addEventListener('input', e => render(e.target.value));
    render();
  }
})();

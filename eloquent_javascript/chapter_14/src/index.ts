// Chapter 14, Exercise 1: Build a table
//
<!doctype html>

<h1>Mountains</h1>

<div id="mountains"></div>

<script>
  const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
  ];

  let mountains = document.getElementById('mountains')
  let _keys = Object.keys(MOUNTAINS[0])
  let table = document.createElement('table')
  mountains.appendChild(table)
  let headers = document.createElement('tr')
  table.appendChild(headers)
  
  for (let key of _keys) {
    let th = document.createElement('th') 
    th.textContent = key
    headers.appendChild(th)
  }

  for (let mountain of MOUNTAINS) {
    let row = document.createElement('tr')
    for (let key of _keys) {
      let td = document.createElement('td')
      td.textContent = mountain[key]
      if (typeof mountain[key] == 'number') td.style.textAlign = 'right'
      row.appendChild(td)
    }
    table.appendChild(row)
  }
</script>

// Chapter 14, Exercise 2: Elements by Tag Name
//
<!doctype html>

<h1>Heading with a <span>span</span> element.</h1>
<p>A paragraph with <span>one</span>, <span>two</span>
  spans.</p>

<script>
  function byTagName(node, tagName) {
    if (node === null || node === undefined) return [];
    let ans = [];
    if (node.nodeName.toLowerCase() === tagName) ans.push(node);
    node.childNodes.forEach(child => {
      let childAns = byTagName(child, tagName)
      if (childAns.length > 0) ans = ans.concat(childAns);
    });
    return ans;
  }

  console.log(byTagName(document.body, "h1").length);
  // → 1
  console.log(byTagName(document.body, "span").length);
  // → 3
  let para = document.querySelector("p");
  console.log(byTagName(para, "span").length);
  // → 2
</script>

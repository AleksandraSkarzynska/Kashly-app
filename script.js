function showTip(){
  const tips = [
    'W tym miesiącu możesz oszczędzić około 420 zł, ograniczając jedzenie na mieście.',
    'Subskrypcja Canva Pro nie była używana od 21 dni — rozważ anulowanie.',
    'Budżet zakupów jest wykorzystany w 55%, zostało Ci 620 zł do końca miesiąca.'
  ];
  document.getElementById('tip').textContent = tips[Math.floor(Math.random()*tips.length)];
}

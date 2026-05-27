// todo-cli.js
let tarefas = [];
let nextId  = 1;

const adicionar = (titulo, prioridade = "media") => {
  const nova = { id: nextId++, titulo, prioridade, concluida: false };
  tarefas = [...tarefas, nova]; // spread — não muta o array original
  return nova;
};

const concluirVarios = ids =>
    tarefas = tarefas.map(t => ids.includes(t.id) ? { ...t, concluida: true } : t);

//const concluir = id =>
  //tarefas = tarefas.map(t => t.id === id ? { ...t, concluida: true } : t);

const remover = id =>
  tarefas = tarefas.filter(t => t.id !== id);

const buscar = texto =>
  tarefas.filter(t => t.titulo.toLowerCase().includes(texto.toLowerCase()));

const stats = () => {
  const total      = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  return { total, concluidas, pendentes: total - concluidas,
           pct: total ? Math.round(concluidas / total * 100) : 0 };
           
};



// ── Teste ──
adicionar("Estudar JavaScript", "alta");
adicionar("Fazer exercícios",   "alta");
adicionar("Tomar café",         "baixa");
adicionar("Ler documentação",   "media");
adicionar("Fazer almoço",       "baixa");
concluirVarios ([3,5]);

console.log("── TODAS ──");
tarefas.forEach(({ id, titulo, prioridade, concluida }) =>
  console.log(`[${concluida ? "✓" : "○"}] #${id} (${prioridade}) ${titulo}
    `)
);

const praDepois = tarefas.filter(t => t.prioridade === "baixa");


const ordenarPorPrioridade = () => {
       const pesos = { baixa: 3,  media: 2,  alta: 1,};
    return [...tarefas].sort((a, b) => pesos[a.prioridade] - pesos[b.prioridade]);
  };

  console.log("── Prioridades: ──");
ordenarPorPrioridade().forEach(t => 
  console.log(`${t.titulo}`)
);

function altaPrioridadeMaiusculo() {
  return tarefas.filter(t => t.prioridade === "alta" && !t.concluida)
                .map (t => t.titulo.toUpperCase());

}

console.log("Urgências pendentes:");
altaPrioridadeMaiusculo().forEach(titulo => {
  console.log(` - ${titulo}`);
});




const { total, concluidas, pendentes, pct } = stats();
console.log(`
── STATS: ${concluidas}/${total} concluídas (${pct}%) ──`);
function inicializar(){
  buscaDados();
}

function editar(id){
  let id_html = document.getElementById(`id_${id}`);
  let descricao_html = document.getElementById(`descricao_${id}`);
  let tempo_html = document.getElementById(`tempo_${id}`);
  let situacao_html = document.getElementById(`situacao_${id}`);
  let botao_edit =document.getElementById(`edit_${id}`);
  let botao_confirm =document.getElementById(`confirm_${id}`);

  id_html.disabled = false;
  descricao_html.disabled = false;
  tempo_html.disabled = false;
  situacao_html.disabled = false;

  botao_edit.classList.add('d-none');
  botao_confirm.classList.remove('d-none');
}

async function salvarEdicao(id){
  let id_html = document.getElementById(`id_${id}`);
  let descricao_html = document.getElementById(`descricao_${id}`);
  let tempo_html = document.getElementById(`tempo_${id}`);
  let situacao_html = document.getElementById(`situacao_${id}`);
  let botao_edit =document.getElementById(`edit_${id}`);
  let botao_confirm =document.getElementById(`confirm_${id}`);

  let descricao = descricao_html.value;
  let tempo = tempo_html.value;
  let situacao = situacao_html.value;

  if (1 == 1){
    try {
      const response = await fetch('http://localhost:8081/modificar',{
          method: 'post',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify({
              id,
              tempo,
              situacao,
              descricao
          })
      })
      if(!response.ok) throw new Error(response.statusText);
      await buscaDados();
  } catch (error) {
    alert('Ops... Ocorreu um erro, por favor tente mais tarde.');
    console.log(error)
  }
  }else{
    alert('Erro. Favor revisar os dados informados!')
  }
}

async function deleteData(id){
  try {
    const response = await fetch('http://localhost:8081/delete',{
        method: 'delete',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            id
        })
    })
    if(!response.ok) throw new Error(response.statusText);
    await buscaDados();
} catch (error) {
  alert('Ops... Ocorreu um erro, por favor tente mais tarde.');
  console.log(error)
}
}

async function buscaDados(){ 
  try {
    const response = await fetch('http://localhost:8081/atividades',{
        method: 'get',
        headers: {
            'content-type': 'application/json'
        }
    })
    if(!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    montaTabela(data);
  } catch (error) {
  alert('Ops... Ocorreu um erro, por favor tente mais tarde.');
  console.log(error)
  }
}

function montaTabela(data){
  let tabela = document.getElementById('listaAtividades');
  tabela.innerHTML = ''

  data.forEach(element => {
    //criando linha
    let linha = tabela.insertRow();

    //criando colunas
    linha.insertCell(0).innerHTML = `<input type="text" class="form-control" value="${element.id}" id="id_${element.id}" disabled>`;
    linha.insertCell(1).innerHTML = `<input type="text" class="form-control" id="descricao_${element.id}" value="${element.descricao}" disabled>`;
    linha.insertCell(2).innerHTML = `<input type="text" class="form-control" id="tempo_${element.id}" value="${element.tempo}" disabled>`;
    linha.insertCell(3).innerHTML = `<select class="form-control" id="situacao_${element.id}" disabled>
                                        <option value="Ativo" ${element.situacao == 'Ativo'? 'selected' : ''}>Ativo</option>
                                        <option value="Inativo" ${element.situacao == 'Inativo'? 'selected' : ''}>Inativo</option>
                                    </select>`;
    linha.insertCell(4).innerHTML = ` <button class="btn btn-warning" onclick="editar('${element.id}')" id="edit_${element.id}">
                                        <i class = "fas fa-edit"></i>
                                      </button>

                                      <button class="btn btn-success d-none" id="confirm_${element.id}" onclick="salvarEdicao('${element.id}')">
                                        <i class = "fas fa-check"></i>
                                      </button>

                                      <button class="btn btn-danger" id="delete_${element.id}" onclick="deleteData('${element.id}')">
                                        <i class = "fas fa-times"></i>
                                      </button>`;
  });
}

async function cadastrarAtividade(){
  let id = document.getElementById('id_new').value;
  let tempo = document.getElementById('tempo_new').value;
  let situacao = document.getElementById('situacao_new').value;
  let descricao = document.getElementById('descricao_new').value;

  if (1==1){ //implementar validações
    try {
      const response = await fetch('http://localhost:8081/criar',{
          method: 'post',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify({
              id,
              tempo,
              situacao,
              descricao
          })
      })
      if(!response.ok) throw new Error(response.statusText);

      const data = await response.json()
      console.log(data)
      await buscaDados();
  } catch (error) {
    alert('Ops... Ocorreu um erro, por favor tente mais tarde.');
    console.log(error)
  }
  }else{
    alert('Erro. Favor revisar os dados informados!')
  }

}
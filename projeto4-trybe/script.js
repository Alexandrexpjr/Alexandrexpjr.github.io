window.onload = function() {
  const getTask = document.querySelector('#texto-tarefa');
  const getButton = document.querySelector('#criar-tarefa');
  const getOL = document.querySelector('#lista-tarefas');

  getButton.addEventListener('click', function() {
    const createTask = document.createElement('li');
    createTask.innerHTML = getTask.value;
    getOL.appendChild(createTask);
    getTask.value = '';    
  });

  getOL.addEventListener('click', function(event) {

    //reseta o id de todos os itens da lista
    const getLi = document.querySelectorAll('li');
    for (let index = 0; index < getLi.length; index += 1) {
      getLi[index].id = '';
    }

    //seta o id do selecionado para 'selected'
    const changeId = event.target.id;
    if (changeId !== 'selected') {
      event.target.id = 'selected';
    } else {
      event.target.id = '';
    }
  });

  getOL.addEventListener('dblclick', function(event) {
    const changeStyle = event.target.style;
    const changeClass = event.target.className;
    const getLi = document.querySelectorAll('li');
    if (changeClass !== 'completed') {
      event.target.className = 'completed';
    } else {
      event.target.className = '';
    }
  });

  const getClearButton = document.querySelector('#apaga-tudo');

  getClearButton.addEventListener('click', function() {
    const getLi = document.querySelectorAll('li');
    for (let index = 0; index < getLi.length; index += 1) {
      getLi[index].remove();
    }
  });

  const getRemoveButton = document.querySelector('#remover-finalizados');

  getRemoveButton.addEventListener('click', function() {
    const getLi = document.querySelectorAll('li');
    const getCompleted = document.querySelectorAll('.completed');
    for (let index = 0; index < getCompleted.length; index += 1) {
      getCompleted[index].remove();
    }
  });

  const getSaveButton = document.querySelector('#salvar-tarefas');

  getSaveButton.addEventListener('click', function() {
    let savedList = [];
    for (let index = 0; index < getOL.children.length; index += 1) {
      if(getOL.children[index].className === 'completed') {
        savedList.push('[' + getOL.children[index].innerHTML + ']');
      } else {
        savedList.push(getOL.children[index].innerHTML);
      }
    }
    
    const strangerThings = savedList.join('||');

    localStorage.setItem('list', strangerThings);
  });

  const getDownButton = document.querySelector('#mover-baixo');
  const getUpButton = document.querySelector('#mover-cima');

  getUpButton.addEventListener('click', function() {
    const getSelected = document.querySelector('#selected');
    const getLi = document.querySelectorAll('li');

    if (getSelected) {
      const selectedContent = getSelected.outerHTML;
      for (let index = 0; index < getLi.length; index += 1) {
        let listContent = getLi[index].outerHTML;
        if (getLi[index] === getSelected && index > 0) {
          getSelected.outerHTML = getLi[index - 1].outerHTML;
          getLi[index - 1].outerHTML = selectedContent;
        }
      }
    }  
  })

  getDownButton.addEventListener('click', function() {
    const getSelected = document.querySelector('#selected');
    const getLi = document.querySelectorAll('li');

    if (getSelected) {
      const selectedContent = getSelected.outerHTML;
      for (let index = 0; index < getLi.length; index += 1) {
        let listContent = getLi[index].outerHTML;
        if (getLi[index] === getSelected && index < getLi.length - 1) {
          getSelected.outerHTML = getLi[index + 1].outerHTML;
          getLi[index + 1].outerHTML = selectedContent;
        }
      }
    }  
  });

  const getRemoveOneButton = document.querySelector('#remover-selecionado');

  getRemoveOneButton.addEventListener('click', function() {
    const getSelected = document.querySelector('#selected');
    if (getSelected) {
      getSelected.remove();
    }
  })

  if (localStorage.getItem('list')) {
    const splitedThings = localStorage.getItem('list').split('||');
    for (let item of splitedThings) {
      const thing = document.createElement('li');
      if (item[0] === '[' && item[item.length-1] === ']') {
        thing.innerHTML = item.slice(1, -1);
        thing.className = 'completed';
      } else {
        thing.innerHTML = item;
      }
      getOL.appendChild(thing);
    }
  }
}


// TODO: write code here

export class Board {
  constructor(element) {
    this.element = element;
    this.task_columns = Array.from(document.querySelectorAll('.tasks-column'));
    this.tasks = Array.from(document.querySelectorAll('.task-item'));
    this.edits = Array.from(document.querySelectorAll('.edit-header'));
    this.adds = Array.from(document.querySelectorAll('.add-task'));
    this.initEditHandlers();
    this.initAddHandlers();
    this.initDeleteHandlers();
    this.initDragAndDropHandlers();
  }

  initEditHandlers() {
    for (let edit of this.edits) {
      edit.addEventListener('click', () => {
        const header = edit.previousElementSibling;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = header.textContent;
        input.classList.add('edit-input');
        const okButton = document.createElement('button');
        okButton.classList.add('ok-button');
        okButton.textContent = 'OK';
        okButton.addEventListener('click', () => {
          header.textContent = input.value;
          edit.parentElement.removeChild(input);
          edit.parentElement.removeChild(okButton);
          edit.parentElement.insertBefore(header, edit);
          edit.style.display = 'block';
        });
        edit.parentElement.replaceChild(input, header);
        edit.style.display = 'none';
        edit.parentElement.insertBefore(okButton, edit);
      })
    }
  }

  initAddHandlers() {
    for (let add of this.adds) {
      add.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Новая задача';
        input.classList.add('add-input');
        const okButton = document.createElement('button');
        okButton.classList.add('add-button');
        okButton.textContent = 'Add card';
        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-button');
        cancelButton.textContent = '✖';
        okButton.addEventListener('click', () => {
          const newTask = document.createElement('div');
          newTask.classList.add('task-item');
          newTask.textContent = input.value;
          add.parentElement.insertBefore(newTask, add);
          this.tasks.push(newTask);
          this.initDeleteHandlers();
          this.initDragAndDropHandlers();
          add.parentElement.removeChild(input);
          add.parentElement.removeChild(okButton);
          add.parentElement.removeChild(cancelButton);
        });
        cancelButton.addEventListener('click', () => {
          add.parentElement.removeChild(input);
          add.parentElement.removeChild(okButton);
          add.parentElement.removeChild(cancelButton);
        });
        add.parentElement.insertBefore(input, add);
        add.parentElement.insertBefore(okButton, add);
        add.parentElement.insertBefore(cancelButton, add);
      })
    }
  }

  initDeleteHandlers() {
    this.tasks.forEach(taskItem => {
      taskItem.addEventListener('mouseover', this.handleMouseOver);
      taskItem.addEventListener('mouseout', this.handleMouseOut);
      taskItem.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-mark')) {
          const taskIndex = this.tasks.indexOf(taskItem);
          if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
          }
          taskItem.remove();
        }
      });
    });
  }

  handleMouseOver(e) {
    const deleteMark = document.createElement('div');
    deleteMark.classList.add('delete-mark');
    deleteMark.textContent = '✖';
    e.target.appendChild(deleteMark);
  }

  handleMouseOut(e) {
    const deleteMark = e.target.querySelector('.delete-mark');
    if (deleteMark) {
      deleteMark.remove();
    }
  }

  initDragAndDropHandlers() {
    let actualElement;
    let insertIndex = 0;
    const onMouseUp = (e) => {
      const mouseUpItem = e.target;
      const commonParent = mouseUpItem.closest('.tasks-column');
      const taskItems = Array.from(commonParent.querySelectorAll('.task-item'));
      insertIndex = taskItems.indexOf(mouseUpItem);
      commonParent.insertBefore(actualElement, insertIndex === 0 ? taskItems[0] : taskItems[insertIndex]);
      actualElement.classList.remove('dragged');
      actualElement.style.top = 0 + 'px';
      actualElement.style.left = 0 + 'px';
      actualElement = undefined;
      insertIndex = 0;
      document.documentElement.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mousemove', onMouseMove);
    };
    const onMouseMove = (e) => {
      e.preventDefault();
      if (actualElement.classList.contains('dragged')) {
        const rect = actualElement.parentElement.getBoundingClientRect();
        actualElement.style.top = e.clientY + 'px';
        actualElement.style.left = e.clientX + 'px';
        const taskItems = Array.from(actualElement.parentElement.querySelectorAll('.task-item'));
        for (let i = 0; i < taskItems.length; i++) {
          if (e.clientY < taskItems[i].offsetTop + taskItems[i].offsetHeight / 2) {
            insertIndex = i;
            break;
          }
        }
      }
    };
    this.tasks.forEach(task => {
      task.addEventListener('mousedown', (e) => {
        if (e.button === 0 && !e.target.classList.contains('delete-mark')) {
          actualElement = e.target;
          actualElement.classList.add('dragged');
          document.documentElement.addEventListener('mouseup', onMouseUp);
          document.documentElement.addEventListener('mousemove', onMouseMove);
        } else {
          return;
        }
      });
    });
  }
}


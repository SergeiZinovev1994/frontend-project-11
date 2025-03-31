import onChange from "on-change";
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const schema = yup.string().url('Ссылка должна быть валидным URL');

const index = () => {
  const initialState = {
    site: '',
    linkAriaValid: false,
    submitDisabled: true,
    state: 'filling', // 'processing', 'processed', 'failed'
    errors: [],
    sites: [],
  };

  const state = onChange(initialState, (path, value, previousValue) => {
    switch (path) {
      case ('errors'): {
        const feedback = document.querySelector('.feedback');
        feedback.textContent = '';
        feedback.classList.remove('text-danger', 'text-success');
        const input = document.querySelector('#url-input');
        input.classList.remove('is-invalid');
        if (value.length === 0) {
          feedback.classList.add('text-success');
          feedback.textContent = 'RSS успешно загружен';
          input.value = '';
        } else {
          feedback.classList.add('text-danger');
          feedback.textContent = state.errors[0];
          input.classList.add('is-invalid');
        }
      }
    }
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const link = formData.get('url');
    state.errors = [];
    schema.validate(link)
    .then((url) => {
      if (state.site === link) {
        state.linkAriaValid =  false;
        state.submitDisabled = true;
        state.errors.push('RSS уже существует');
      } else {
        state.linkAriaValid =  true;
        state.submitDisabled = false;
        state.site = link;
      }
    })
    .catch((e) => {
      state.linkAriaValid = false;
      state.submitDisabled = true;
      console.log(e);
      state.errors.push(e);
    })
  })
};

index();
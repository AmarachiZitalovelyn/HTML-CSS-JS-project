document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.survey-form');
  const SuccessMessage = document.getElementById('Success-Message');
  
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(function (field) {
  field.addEventListener('blur', function () { 
    validateField(field);
  });
  
  field.addEventListener('input', function () {
    if (field.classList.contains ('invalid')) {
      validateField(field)
  }
});
  });

  function validateField(field) {
    const isValid =field.checkValidity();
    field.classList. toggle('invalid', !isValid);

    const errorEL =field.parentElement.querySelector('.error-message');
    if (errorEL) {
      errorEL.classList.toggle('visible', !isValid);
    }  
  }
  
const exerciseRadios = form.querySelectorAll('input[name="exercise"]');
  const exerciseError = document.getElementById('exercise-error');

  exerciseRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      exerciseError.classList.remove('visible');
    });
  });

  const selectAllBtn = document.getElementById('select-all-btn');
  const topicCheckboxes = form.querySelectorAll('input[name="topics"]');

  selectAllBtn.addEventListener('click', function () {
    const allChecked = Array.from(topicCheckboxes).every(cb => cb.checked);

    topicCheckboxes.forEach(function (checkbox) {
      checkbox.checked = !allChecked;
    });

    selectAllBtn.textContent = allChecked ? 'Select all' : 'Clear all';
  });

  const commentsField = document.getElementById('comments');
  const charCounter = document.getElementById('char-counter');
  const maxLength = commentsField.getAttribute('maxlength');

  commentsField.addEventListener('input', function () {
    const currentLength = commentsField.value.length;
    charCounter.textContent = currentLength + ' / ' + maxLength;
    charCounter.classList.toggle('limit-close', currentLength >= maxLength - 20);
  });

  form.addEventListener('submit', function (event) {
    let formIsValid = true;

    requiredFields.forEach(function (field) {
      validateField(field);
      if (!field.checkValidity()) {
        formIsValid = false;
      }
    });

    const exerciseChosen = Array.from(exerciseRadios).some(radio => radio.checked);
    if (!exerciseChosen) {
      exerciseError.classList.add('visible');
      formIsValid = false;
    }

    if (!formIsValid) {
      event.preventDefault();
      return;
    }

    successMessage.classList.add('visible');
  });

});
const form = document.querySelector("#registartion-form");
const inputFields = form.querySelectorAll("input");
const selectFields = form.querySelectorAll("select");
const checkBoxField = form.querySelectorAll("input[type='checkbox']");
const selectField = form.querySelector(".form-select");
const presentAddressDetails = document.querySelector(".presentAddresstextArea");
const prefillAddressCheckbox = document.querySelector(
  ".prefill-address-checkbox"
);
let permanentAddressDetails = document.querySelector(
  ".permanentAddresstextArea"
);
const textAreaFields = form.querySelectorAll("textarea");
const fieldValues = {};
const table = document.querySelector(".table");

inputFields.forEach((inputfield) => {
  inputfield.addEventListener("input", (e) => {
    if (e.target.value !== "") {
      inputfield.nextElementSibling.style.display = "none";
    }
  });
});

//adding-icons before gender options once dropdown selection is done
selectField.addEventListener("change", () => {
  selectFields.forEach((select) => {
    if (select.value === "male") {
      document.querySelector(".bi-gender-male").style.display = "block";
      document.querySelector(".bi-gender-female").style.display = "none";
      document.querySelector(".custom-gender-error-message").style.display =
        "none";
      document.querySelector(".form-select").classList.add("ps-4");
    } else if (select.value === "female") {
      document.querySelector(".bi-gender-female").style.display = "block";
      document.querySelector(".bi-gender-male").style.display = "none";
      document.querySelector(".custom-gender-error-message").style.display =
        "none";
      document.querySelector(".form-select").classList.add("ps-4");
    } else {
      document.querySelector(".bi-gender-female").style.display = "none";
      document.querySelector(".bi-gender-male").style.display = "none";
      document.querySelector(".custom-gender-error-message").style.display =
        "none";
      document.querySelector(".form-select").classList.remove("ps-4");
    }
  });
});

//disable-enable prefill-checkbox based on user input in presentnAddress textarea
presentAddressDetails.addEventListener("input", (e) => {
  if (e.target.value !== "") {
    document.querySelector(".form-check-input").removeAttribute("disabled");
    document.querySelector(".form-check-label").style.color="blue";
    document.querySelector(".form-check-label").style.fontWeight="bold";
    document.querySelector(
      ".custom-presentAddress-error-message"
    ).style.display = "none";
  } else {
    checkBoxField.forEach((checkbox) => {
      if (checkbox.checked === true) {
        checkbox.checked = false;
        checkbox.disabled = true;
        permanentAddressDetails.value = "";
      }
    });
  }
});

//disable checkbox for copying present address to permanent address, 
// when user tries to enter something different inside permanent address textarea
permanentAddressDetails.addEventListener("input", (e) => {
  if(presentAddressDetails.value !== e.target.value || presentAddressDetails.value === e.target.value) {
    checkBoxField.forEach((checkbox) => {
        if (checkbox.checked === true) {
          checkbox.checked = false;
          checkbox.disabled = true;
         
        }
      });
  }
  if(presentAddressDetails.value !== e.target.value){
    checkBoxField.forEach((checkbox) => {
        if (checkbox.checked === true) {
          checkbox.checked = false;
          checkbox.disabled = true;
         
        }
      });
  }
});

//prefill data from presentAddress to permanentAddress without letting user to type
prefillAddressCheckbox.addEventListener("change", () => {
  const isChecked = checkBoxField[0].checked;
  if (isChecked) {
    document.querySelector(
      ".custom-permanentAddress-error-message"
    ).style.display = "none";
    permanentAddressDetails.value = presentAddressDetails.value;
  } else {
    permanentAddressDetails.value = "";
  }
});

//after form submission
form.addEventListener("submit", (e) => {
  let isErrorExists = false;

  //input fields of type text and tel validation
  inputFields.forEach((field) => {
    if (
      field.type === "text" ||
      field.type === "tel" ||
      field.type === "email"
    ) {
      if (field.value === "") {
        isErrorExists = true;
        field.nextElementSibling.style.display = "block";
        field.nextElementSibling.style.position = "inherit";
        e.preventDefault();
        e.stopPropagation();
      } else {
        if (isErrorExists) {
          return;
        }
        fieldValues[field.name] = field.value;
      }
    }
  });

  //textArea fields validation
  textAreaFields.forEach((textArea) => {
    if (textArea.value === "") {
      isErrorExists = true;
      if (textArea.name === "permanentAddress") {
        document.querySelector(
          ".custom-permanentAddress-error-message"
        ).style.display = "block";
      }
      if (textArea.name === "presentAddress") {
        document.querySelector(
          ".custom-presentAddress-error-message"
        ).style.display = "block";
      }
      e.preventDefault();
      e.stopPropagation();
    } else {
      if (isErrorExists) {
        return;
      }
      document.querySelector(
        ".custom-permanentAddress-error-message"
      ).style.display = "none";
      document.querySelector(
        ".custom-presentAddress-error-message"
      ).style.display = "none";
      fieldValues[textArea.name] = textArea.value;
    }
  });

  //dropdown fields validation
  selectFields.forEach((select) => {
    if (select.value === "Select Gender") {
      isErrorExists = true;
      document.querySelector(".custom-gender-error-message").style.display =
        "block";
      e.preventDefault();
      e.stopPropagation();
    } else {
      document.querySelector(".custom-gender-error-message").style.display =
        "none";
      if (isErrorExists) {
        return;
      }
      fieldValues[select.name] = select.value;
      isErrorExists = false;
    }
  });
  isErrorExists = false;
  for (const key in fieldValues) {
    window.sessionStorage.setItem(key, fieldValues[key]);
  }
});

export const fieldBuilder = ({
    elementType = "",
    type = "",
    autoComplete = "",
    placeholder = "",
    value = "",
    options = [{ value: "", displayValue: "" }],
    validation = null,
    valid = false,
    touched = false
  }) => {
    let elementConfig = null;
  
    switch (elementType) {
      case "input":
        elementConfig = {
          type,
          autoComplete,
          placeholder
        };
        break;
  
      case "select":
        elementConfig = {
          options
        };
        break;
  
      default:
        break;
    }
    return {
      elementType,
      elementConfig,
      value,
      validation,
      valid,
      touched
    };
  };
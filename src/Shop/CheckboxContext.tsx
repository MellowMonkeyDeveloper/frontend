import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface Checkbox {
  value: string;
  trait: string;
}

interface CheckboxState {
  checkboxes: Checkbox[];
}

interface CheckboxAction {
  type: 'TOGGLE_CHECKBOX';
  payload: { value: string; trait: string };
}

const CheckboxContext = createContext<{
  state: CheckboxState;
  dispatch: React.Dispatch<CheckboxAction>;
} | undefined>(undefined);

const initialState: CheckboxState = {
  checkboxes: [],
};

const checkboxReducer = (state: CheckboxState, action: CheckboxAction): CheckboxState => {
  switch (action.type) {
    case 'TOGGLE_CHECKBOX':
      const { trait, value } = action.payload;
      const updatedCheckboxes = state.checkboxes.map((checkbox) =>
        checkbox.value === value ? { ...checkbox } : checkbox
      );
      return { ...state, checkboxes: updatedCheckboxes };
    default:
      return state;
  }
};

interface CheckboxProviderProps {
  children: ReactNode;
}

const CheckboxProvider: React.FC<CheckboxProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(checkboxReducer, initialState);

  return (
    <CheckboxContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckboxContext.Provider>
  );
};

const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error('useCheckboxContext must be used within a CheckboxProvider');
  }
  return context;
};

export { CheckboxProvider, useCheckboxContext };

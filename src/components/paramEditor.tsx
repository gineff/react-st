import React from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: { [key: number]: string };
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: this.initializeParamValues(props.model.paramValues),
    };
  }

  initializeParamValues(paramValues: ParamValue[]): { [key: number]: string } {
    const values: { [key: number]: string } = {};
    paramValues.forEach((pv) => {
      values[pv.paramId] = pv.value;
    });
    return values;
  }

  handleInputChange = (paramId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((prevState) => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: event.target.value,
      },
    }));
  };

  getModel(): Model {
    const { params } = this.props;
    const { paramValues } = this.state;

    const updatedParamValues: ParamValue[] = params.map((param) => ({
      paramId: param.id,
      value: paramValues[param.id] || '',
    }));

    return {
      paramValues: updatedParamValues,
      colors: this.props.model.colors, 
    };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map((param) => (
          <div key={param.id}>
            <label>{param.name}</label>
            <input 
              type="text"
              value={paramValues[param.id] || ''}
              onChange={(e) => this.handleInputChange(param.id, e)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ParamEditor;

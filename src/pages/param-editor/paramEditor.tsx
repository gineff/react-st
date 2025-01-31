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
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Редактор параметров</h2>
        <div className="space-y-4">
          {params.map((param) => (
            <div key={param.id} className="flex flex-col">
              <label
                htmlFor={`param-${param.id}`}
                className="text-sm font-medium text-gray-700 mb-1"
              >
                {param.name}
              </label>
              <input
                id={`param-${param.id}`}
                type="text"
                value={paramValues[param.id] || ''}
                onChange={(e) => this.handleInputChange(param.id, e)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500 
                p-2 border"
              />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            onClick={() => console.log(this.getModel())}
            className="bg-blue-500 text-white px-4 py-2 rounded-md 
                     hover:bg-blue-600 transition-colors"
          >
            Получить модель
          </button>
        </div>
      </div>
    );
  }
}

export default ParamEditor;

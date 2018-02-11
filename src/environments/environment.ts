// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  data: {
    coils: 'read_coils.json',
    coilsPost: 'write_coil.json',
    discreteInputs: 'read_discrete_inputs.json',
    holdingRegister: 'read_holding_registers.json',
    inputRegister: 'read_input_registers.json',
    holdingRegisterPost: 'write_holding_register.json'
  }
};

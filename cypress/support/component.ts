// React 18
import { mount } from 'cypress/react18'
import { ReactElement } from "react";

// @ts-ignore
Cypress.Commands.add('mount', (component: ReactElement, options: any) => {
  // Wrap any parent components needed
  // ie: return mount(<MyProvider>{component}</MyProvider>, options)
  return mount(component, options)
})
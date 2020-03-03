import {Context} from 'preact';
import {
  matcherHint,
  printExpected,
  EXPECTED_COLOR as expectedColor,
  RECEIVED_COLOR as receivedColor,
} from 'jest-matcher-utils';

import {Node} from '../types';

import {assertIsNode, diffs, printType} from './utilities';

export function toProvidePreactContext<Type>(
  this: jest.MatcherUtils,
  node: Node<unknown>,
  Context: Context<Type>,
  value?: Type,
) {
  assertIsNode(node, {
    expectation: 'toProvidePreactContext',
    isNot: this.isNot,
  });

  const foundByType = node.findAll(Context.Provider);
  const foundByValue =
    value == null
      ? foundByType
      : foundByType.filter(element =>
          // preact's context provider types are awkward here
          this.equals(value, element.prop('value' as any)),
        );

  const pass = foundByValue.length > 0;

  const message = pass
    ? () =>
        `${matcherHint('.not.toProvidePreactContext')}\n\n` +
        `Expected the React element:\n  ${receivedColor(node.toString())}\n` +
        `Not to contain context provider:\n  ${expectedColor(
          printType(Context.Provider),
        )}\n${
          value ? `With value matching:\n  ${printExpected(value)}\n` : ''
        }` +
        `But ${foundByValue.length} matching ${printType(Context.Provider)}${
          foundByValue.length === 1 ? 's were' : ' was'
        } found.\n`
    : () =>
        `${`${matcherHint('.toProvidePreactContext')}\n\n` +
          `Expected the React element:\n  ${receivedColor(node.toString())}\n` +
          `To contain context provider:\n  ${expectedColor(
            printType(Context.Provider),
          )}\n${
            value ? `With value matching:\n  ${printExpected(value)}\n` : ''
          }`}${
          foundByType.length === 0
            ? `But no matching ${printType(Context.Provider)}s were found.\n`
            : `But the ${
                foundByType.length === 1
                  ? 'found provider has'
                  : 'found provider have'
              } had different values:\n\n${diffs(
                foundByType,
                {value},
                this.expand,
              )}`
        }`;

  return {pass, message};
}

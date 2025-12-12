import { ShapeCard } from '../shapecard.js';

describe('ShapeCard tests', () => {
  test('shapeTag returns the expected SVG tag for known shapes', () => {
    expect(ShapeCard.shapeTag('circle')).toBe('circle');
    expect(ShapeCard.shapeTag('square')).toBe('rect');
    expect(ShapeCard.shapeTag('triangle')).toBe('polygon');
  });

  test('getUniqueRandomCardsAsHTML returns the expected number of elements when duplicated', () => {
    // request 2 unique cards with duplication enabled -> should produce 4 <shape-card> elements
    const html = ShapeCard.getUniqueRandomCardsAsHTML(2, true);
    const count = (html.match(/<shape-card/g) || []).length;
    expect(typeof html).toBe('string');
    expect(count).toBe(4);
  });
});

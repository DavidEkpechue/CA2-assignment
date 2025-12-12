describe('Very small sanity tests', () => {
  test('adds numbers correctly', () => {
    expect(1 + 1).toBe(2);
  });

  test('string contains substring', () => {
    expect('memory-game'.includes('memory')).toBe(true);
  });
});

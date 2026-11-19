import { MENU_ITEMS } from '../data/menuItems';

export default function MainMenu({ selectedIndex, onSelect }) {
  return (
    <ul className="menu-list">
      {MENU_ITEMS.map((item, index) => (
        <li
          key={item.screen}
          className={index === selectedIndex ? 'menu-item selected' : 'menu-item'}
          onClick={() => onSelect(index)}
        >
          <span>{item.label}</span>
          <span className="arrow">▶</span>
        </li>
      ))}
    </ul>
  );
}

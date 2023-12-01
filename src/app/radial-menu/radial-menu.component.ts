import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { menuItem } from 'src/helpers/interfaces';
interface menuStyles { top?: string; left?: string; width?: string; height?: string }

@Component({
  selector: 'app-radial-menu',
  templateUrl: './radial-menu.component.html',
  styleUrls: ['./radial-menu.component.css']
})
export class RadialMenuComponent implements OnInit {
  @Input() id!: string;
  @Input() items: menuItem[] = [];

  radius = 50;
  active = true;
  closing = false;
  styles: menuStyles = {};

  constructor(
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.styles.width = 2 * this.radius + 'px';
    this.styles.height = 2 * this.radius + 'px';
  }

  calcRotation(index: number): { x: number; y: number } {
    const totalItems = this.items.length;
    const baseAngle = 2 * Math.PI / totalItems;

    const x = this.radius * Math.cos(baseAngle * index);
    const y = this.radius * Math.sin(baseAngle * index);

    return { x, y };
  }

  @HostListener('document:click', ['$event.target'])
  detectClick(target: EventTarget) {
    const inside = this.elementRef.nativeElement.contains(target);
    if (inside) return;
    this.closeMenu();
  }

  openMenu(id: string): void {
    if (this.id != id) return;
    this.active = true;
    setTimeout(() => {
      this.radius = 50;
      this.closing = false;
    }, 1);
  }

  closeMenu(): void {
    this.radius = 0;
    this.closing = true;
    setTimeout(() => {
      this.active = false;
    }, 180);
  }

  doAction(item: menuItem) {
    if (!item.action) return;
    item.action();
  }
}

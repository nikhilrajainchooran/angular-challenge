import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMMON_MATERIAL_MODULES } from '../../modules/material.modules';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...COMMON_MATERIAL_MODULES],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar { }

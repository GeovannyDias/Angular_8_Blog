import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from 'src/app/components/posts/post.service';
import { PostI } from '../../models/post.interface';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class TableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['titlePost', 'tagsPost', 'actions']; // Nombres de las columnas
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getDataPosts();
  }

  ngAfterViewInit() {
    // Se ejecuta cuando inicia la visualizacion del componente
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getDataPosts() {
    this.postService.getPosts().subscribe(posts => {
      console.log('Posts:', posts);
      this.dataSource.data = posts;
    });
  }


  // CRUD

  onEditPost(post: PostI) {
    console.log('Edit:', post);

  }

  onDeletePost(post: PostI) {
    console.log('Delete:', post);
  }
  // -------------------------
  onNewPost() {
    console.log('New Post');
  }

}

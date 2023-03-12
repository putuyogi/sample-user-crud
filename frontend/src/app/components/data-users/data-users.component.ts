import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { PageEvent } from '@angular/material/paginator'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { AuthService } from 'src/app/services/auth/auth.service'
import { UserService } from 'src/app/services/user/user.service'
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component'
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component'
import { ViewDetailDialogComponent } from '../view-detail-dialog/view-detail-dialog.component'

@Component({
  selector: 'app-data-users',
  templateUrl: './data-users.component.html',
  styleUrls: ['./data-users.component.css']
})
export class DataUsersComponent implements OnInit {

  displayedColumns: string[] = ['full_name', 'email', 'date_of_birth', 'action']

  pageSizeOptions: number[] = [1, 5, 10, 25, 100]
  pageSize: number = 10
  length: number = 0
  pageIndex: number = 0

  keyword: string = ''

  dataSource: any = []
  userData: any = {}

  constructor(private auth: AuthService,
    private user: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) {
    this.userData = this.auth.getAuthData()
  }

  async ngOnInit() {
    await this.loadData()
  }

  async loadData() {
    const loadSnackBar = this.snackBar.open("Loading data...")
    try {
      let response = await this.user.getData(this.pageSize, this.pageIndex, this.keyword)
      this.dataSource = response.data
      this.length = response.total_data
      loadSnackBar.dismiss()
    } catch (ex: any) {
      loadSnackBar.dismiss()
      const message = (ex.error?.statusCode !== undefined)
        ? ex.error?.message
        : ex.message
      this.snackBar.open(message, 'Close', {
        duration: 3000
      })
    }
  }

  async deleteData(id: string) {
    const loadSnackBar = this.snackBar.open("Deleting data...")
    try {
      await this.user.deleteData(id)
      loadSnackBar.dismiss()
    } catch (ex: any) {
      loadSnackBar.dismiss()
      const message = (ex.error?.statusCode !== undefined)
        ? ex.error?.message
        : ex.message
      this.snackBar.open(message, 'Close', {
        duration: 3000
      })
    }
  }

  async updatedData(id: string, data: any) {
    const loadSnackBar = this.snackBar.open("Updating data...")
    try {
      data.date_of_birth = moment(data.date_of_birth).format("YYYY-MM-DD")
      await this.user.updateData(id, data)
      loadSnackBar.dismiss()
    } catch (ex: any) {
      loadSnackBar.dismiss()
      const message = (ex.error?.statusCode !== undefined)
        ? ex.error?.message
        : ex.message
      this.snackBar.open(message, 'Close', {
        duration: 3000
      })
    }
  }

  async handlePageEvent(e: PageEvent) {
    this.length = e.length
    this.pageSize = e.pageSize
    this.pageIndex = e.pageIndex
    await this.loadData()
  }

  changePassword() {
    this.router.navigate(['change-password'])
  }

  signOut() {
    this.auth.clearAuthenticationData()
    this.router.navigate(['login'])
  }

  detail(id: string) {
    const detailUser = this.dataSource.filter((x: any) => x.id === id)[0]
    this.dialog.open(ViewDetailDialogComponent, { data: detailUser })
  }

  edit(id: string) {
    const detailUser = this.dataSource.filter((x: any) => x.id === id)[0]
    const dialogRef = this.dialog.open(EditDialogComponent, { data: detailUser })

    dialogRef.afterClosed().subscribe(async (result) => {
      console.log(result)
      if (result !== '') {
        await this.updatedData(id, result)
        await this.loadData()
      }
    })
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent)

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result === 1) {
        await this.deleteData(id)
        await this.loadData()
      }
    })
  }
}
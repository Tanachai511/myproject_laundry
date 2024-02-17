// import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
// import { CartService } from "./cart.service";
// import { Request } from "express";
// import { CreateCartDTO, UpdateCartDTO } from "./cart.dto";
// import { Cart } from "./cart.entities";
// import { UsersService } from "src/user/user.service";

// @Controller('cart')
// export class CartController {
//     constructor(
//         private readonly cartService: CartService,
//         private readonly userService: UsersService) {

//     }

//     @Get()
//     getIndex(@Req() request: Request): Promise<Cart[]> {
//         return this.cartService.findAll();
//     }

//     @Get(':cartID')
//     getCatById(@Param('cartID') id: number): Promise<Cart> {
//         return this.cartService.findOne(id)
//     }

//     @Post()
//     async postCreate(@Body() createCartDTO: CreateCartDTO): Promise<any> {
//         let user = await this.userService.findOne("Doe")
//         return this.cartService.create(createCartDTO,user)
//     }

//     @Put(':cartID')
//     updateCartById(@Param('cartID') id: number, @Body() updateCartDTO: UpdateCartDTO): Promise<Cart> {
//         return this.cartService.update(updateCartDTO)
//     }

//     @Delete(':cartID')
//     deleteCatById(@Param('cartID') id: number): string {
//         this.cartService.DeleteQueryBuilder(id);
//         return "OK"
//     }
// }

import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CreateCartDTO, UpdateCartDTO } from "./cart.dto";
import { Cart } from "./cart.entities";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guards";


@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService,
        ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getIndex(@Req() request: Request,@Request() {user}: any): Promise<Cart[]> {
        return this.cartService.findAll(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':cartID')
    getCatById(@Param('cartID') id: number,@Request() {user}: any): Promise<Cart> {
        return this.cartService.findOne(id,user)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async postCreate(@Body() createCartDTO: CreateCartDTO,@Request() {user}: any): Promise<any> {
        return this.cartService.create(createCartDTO,user)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':cartID')
    updateCartById(@Param('cartID') id: number, @Body() updateCartDTO: UpdateCartDTO,@Request() {user}: any): Promise<Cart> {
        return this.cartService.update(updateCartDTO,user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':cartID')
    deleteCatById(@Param('cartID') id: number,@Request() {user}: any): string {
        this.cartService.DeleteQueryBuilder(id,user);
        return "OK"
    }
}
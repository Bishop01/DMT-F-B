<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SupportController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login',[LoginController::class,'login']);
Route::post('/register',[RegisterController::class,'register']);

Route::get('/routes',[UserController::class,'getRoute']);
Route::get('/stations',[UserController::class,'getStation']);

Route::post('/routedetails',[UserController::class,'getRoutePrice']);


Route::post('/checkout',[UserController::class,'confirmCheckout']);
Route::post('/walletrecharge',[UserController::class,'walletRecharge']);


Route::post('/supportcreate',[SupportController::class,'supportRequest']);
Route::get('/refund/{ticket_id}',[UserController::class,'refund']);

Route::get('/verifyticket/{transaction_id}',[AdminController::class,'verifyticket']);

Route::get('/support/{id}',[UserController::class,'getSupportByUserID']); //authcontext baki


Route::post('/passwordupdate',[UserController::class,'passwordupdate']);

Route::post('/passwordreset',[UserController::class,'passwordreset']);

Route::middleware(['logged'])->group(function () {
    Route::post('/get',[UserController::class,'test']);
    Route::get('/getUser',[UserController::class,'getUser']);
    Route::post('/update',[UserController::class,'update']);
    Route::post('/updatePassword', [UserController::class, "updateProfilePassword"]);
    Route::get('/transactions/{id}', [UserController::class, 'getTransactionsByUserID']);
});

Route::middleware(['logged', 'admin'])->prefix('admin')->group(function () {
    Route::get('/users',[AdminController::class,'getUsers']);
    Route::get('/transactions',[AdminController::class,'getTransactions']);
    Route::post('/delete/{id}',[AdminController::class,'deleteUser']);
    Route::get('/revenues',[AdminController::class,'getRevenues']);

});
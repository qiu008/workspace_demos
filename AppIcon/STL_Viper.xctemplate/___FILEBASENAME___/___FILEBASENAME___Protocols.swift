//___FILEHEADER___

// MARK: - ModuleProtocol

/// OuterSide -> ___VARIABLE_productName___
protocol ___VARIABLE_productName___ModuleInput {}

/// ___VARIABLE_productName___ -> OuterSide
protocol ___VARIABLE_productName___ModuleOutput {}

// MARK: - SceneProtocol

/// Presenter -> View
protocol ___VARIABLE_productName___ViewInput: AnyObject {}

/// View -> Presenter
protocol ___VARIABLE_productName___ViewOutput {}

/// Presenter -> Interactor
protocol ___VARIABLE_productName___InteractorInput {}

/// Interactor -> Presenter
protocol ___VARIABLE_productName___InteractorOutput: AnyObject {}

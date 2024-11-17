//
//  ViewController.swift
//  Search
//
//  Created by STL_QYH on 2020/12/26.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        
    }

    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        super.touchesEnded(touches, with: event)
        //let searchController = UISearchController(searchResultsController: self) //不行
        let searchController = UISearchController()
        searchController.view.backgroundColor = .orange
        searchController.searchResultsUpdater = self
        searchController.delegate = self
//        searchController.searchBar.delegate = self
        searchController.searchBar.barStyle
        let searchContainer = UISearchContainerViewController(searchController: searchController)
        present(searchContainer, animated: true)
    }
}

extension ViewController: UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        //print(searchController.searchBar)
        print(searchController.searchBar.text ?? "text is nil")
        //print(searchController.searchBar.prompt ?? "prompt is nil")
        //print(searchController.searchBar.placeholder ?? "placeholder is nil")
        //print(searchController.searchBar.searchTextField.text ?? "searchTextField.text is nil")
    }
}

extension ViewController: UISearchControllerDelegate {
    func willDismissSearchController(_ searchController: UISearchController) {
        dismiss(animated: true)
    }
}

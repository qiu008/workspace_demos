//
//  TableViewController.swift
//  UIScene
//
//  Created by stl_ on 2025/9/4.
//

import UIKit

class TableViewController: UITableViewController {

//    lazy var dssr: NSDiffableDataSourceSnapshotReference = .init()
//    
//    lazy var dsr: UITableViewDiffableDataSourceReference = .init(tableView: self.tableView) { tv, idx, any in
//        debugPrint("qyh.any", any)
//        debugPrint("qyh.idx.section", idx.section)
//        debugPrint("qyh.idx.row", idx.row)
//        let cell = tv.dequeueReusableCell(withIdentifier: "reuseIdentifier", for: idx)
//        cell.contentView.backgroundColor = .systemCyan
//        return cell
//    }
    lazy var dss: NSDiffableDataSourceSnapshot<Int, Int> = .init()
    
    lazy var dds: UITableViewDiffableDataSource<Int, Int> = .init(tableView: self.tableView) { tableView, indexPath, itemIdentifier in
        debugPrint("qyh.itemIdentifier", itemIdentifier)
        debugPrint("qyh.indexPath.section", indexPath.section)
        debugPrint("qyh.indexPath.row", indexPath.row)
        let cell = tableView.dequeueReusableCell(withIdentifier: "reuseIdentifier", for: indexPath)
        cell.contentView.backgroundColor = .systemCyan
        return cell
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
        
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "reuseIdentifier")
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
//        dssr.appendSections(withIdentifiers: [0,1,2])
//        dssr.appendItems(withIdentifiers: [0,1,2,3,4,5,6,7,8])
//        
//        dsr.applySnapshot(dssr, animatingDifferences: true)
//        
//        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
//            self.dssr.reloadSections(withIdentifiers: [0,1])
//            self.dssr.reloadItems(withIdentifiers: [0,1])
//
//            self.dsr.applySnapshot(self.dssr, animatingDifferences: true)
//        }
        
        
        dss.appendSections([0,1,2])
        dss.appendItems([0,1,2,3,4,5,6,7,8])
        
        dds.apply(dss, animatingDifferences: true)
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) {
            self.dss.reloadSections([0,1])
            self.dss.reloadItems([0,1])
            
            self.dds.apply(self.dss, animatingDifferences: true)
        }
    }
    
    // MARK: - Table view data source

//    override func numberOfSections(in tableView: UITableView) -> Int {
//        // #warning Incomplete implementation, return the number of sections
//        return 3
//    }
//
//    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
//        // #warning Incomplete implementation, return the number of rows
//        return 3
//    }
//    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "reuseIdentifier", for: indexPath)

        cell.contentView.backgroundColor = .systemBrown

        return cell
    }
    
    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
